import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    throw redirect(303, '/dashboard');
  }

  const rawPromos = await prisma.promo.findMany({
    orderBy: { createdAt: 'desc' }
  });

  const promos = rawPromos.map(p => ({
    ...p,
    discountAmt: p.discountAmt ? Number(p.discountAmt) : null
  }));

  return { promos };
};

export const actions: Actions = {
  createPromo: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') return fail(403);
    
    const data = await request.formData();
    const code = data.get('code') as string;
    const description = data.get('description') as string;
    const discountPct = data.get('discountPct') ? parseFloat(data.get('discountPct') as string) : null;
    const isActive = data.get('isActive') === 'on';

    if (!code || !description) return fail(400, { error: 'Kode dan Deskripsi harus diisi.' });

    try {
      // If we are creating an active promo, we might want to deactivate others
      if (isActive) {
        await prisma.promo.updateMany({
          data: { isActive: false }
        });
      }

      await prisma.promo.create({
        data: {
          code,
          description,
          discountPct,
          isActive
        }
      });
      return { success: true };
    } catch (e) {
      console.error(e);
      return fail(500, { error: 'Gagal membuat promo. Pastikan kode unik.' });
    }
  },

  toggleActive: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') return fail(403);
    
    const data = await request.formData();
    const promoId = data.get('promoId') as string;
    const currentStatus = data.get('currentStatus') === 'true';

    if (!promoId) return fail(400);

    // If we are activating this one, optionally deactivate all others so only 1 banner shows
    if (!currentStatus) {
      await prisma.promo.updateMany({
        data: { isActive: false }
      });
    }

    await prisma.promo.update({
      where: { id: promoId },
      data: { isActive: !currentStatus }
    });

    return { success: true };
  },

  deletePromo: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') return fail(403);
    
    const data = await request.formData();
    const promoId = data.get('promoId') as string;

    if (!promoId) return fail(400);

    await prisma.promo.delete({
      where: { id: promoId }
    });

    return { success: true };
  }
};
