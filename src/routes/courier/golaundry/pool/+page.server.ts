import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  if (!user || user.role !== 'COURIER') {
    throw redirect(303, '/dashboard');
  }

  const profile = await prisma.courierProfile.findUnique({
    where: { userId: user.id }
  });

  if (!profile?.isOnline) {
    // You could decide to still let them see it, but perhaps a warning?
  }

  // Find available orders
  const availableOrdersRaw = await prisma.goLaundryOrder.findMany({
    where: { status: 'AVAILABLE' },
    orderBy: { createdAt: 'desc' }
  });

  // Serialize Decimal
  const availableOrders = availableOrdersRaw.map(order => ({
    ...order,
    deliveryFee: Number(order.deliveryFee),
    courierEarning: Number(order.courierEarning),
    platformFee: Number(order.platformFee)
  }));

  return {
    availableOrders,
    profile
  };
};

export const actions: Actions = {
  claimOrder: async ({ request, locals }) => {
    const user = locals.user;
    if (!user || user.role !== 'COURIER') return fail(403);

    const data = await request.formData();
    const orderId = data.get('orderId') as string;

    if (!orderId) return fail(400, { error: 'Invalid order ID' });

    try {
      // ATOMIC TRANSACTION: FIRST CONFIRMED CLAIM
      const result = await prisma.$transaction(async (tx) => {
        // 1. Check if the order is still available (locking)
        const order = await tx.goLaundryOrder.findUnique({
          where: { id: orderId }
        });

        if (!order || order.status !== 'AVAILABLE') {
          return { success: false, message: 'Order baru saja diambil kurir lain.' };
        }

        // 2. Claim the order
        await tx.goLaundryOrder.update({
          where: { id: orderId },
          data: {
            status: 'ASSIGNED',
            courierId: user.id,
            claimedAt: new Date()
          }
        });

        // 3. Record the claim attempt
        await tx.goLaundryClaim.create({
          data: {
            orderId: orderId,
            courierId: user.id,
            status: 'SUCCESS'
          }
        });

        return { success: true };
      });

      if (!result.success) {
        return fail(400, { error: result.message });
      }

    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Internal server error during claim.' });
    }

    // Redirect to active order page
    throw redirect(303, `/courier/golaundry/active`);
  }
};
