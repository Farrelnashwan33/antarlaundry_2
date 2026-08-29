import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'CUSTOMER') {
    throw redirect(303, '/dashboard');
  }

  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) throw redirect(303, '/login');

    const data = await request.formData();
    const label = data.get('label') as string;
    const fullAddress = data.get('fullAddress') as string;
    const city = data.get('city') as string;
    const postalCode = data.get('postalCode') as string;

    if (!label || !fullAddress || !city) {
      return fail(400, { error: 'Label, Alamat Lengkap, dan Kota harus diisi.' });
    }

    try {
      // Get or create CustomerProfile
      const userWithProfile = await prisma.user.findUnique({
        where: { id: user.id },
        include: { customerProfile: true }
      });
      
      let profileId = userWithProfile?.customerProfile?.id;
      if (!profileId) {
        const newProfile = await prisma.customerProfile.create({
          data: { userId: user.id }
        });
        profileId = newProfile.id;
      }

      await prisma.address.create({
        data: {
          customerProfileId: profileId,
          label,
          fullAddress,
          city,
          postalCode: postalCode || null
        }
      });

    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Gagal menambahkan alamat.' });
    }

    throw redirect(303, '/dashboard/address?success=Alamat+berhasil+ditambahkan');
  }
};
