import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params, locals }) => {
  const user = locals.user;
  if (!user || user.role !== 'CUSTOMER') {
    throw redirect(303, '/login');
  }

  const orderId = params.id;
  const orderRaw = await prisma.goLaundryOrder.findUnique({
    where: { id: orderId },
    include: {
      courier: {
        include: { courierProfile: true }
      }
    }
  });

  if (!orderRaw || orderRaw.customerId !== user.id) {
    throw error(404, 'Pesanan tidak ditemukan');
  }

  const order = {
    ...orderRaw,
    deliveryFee: Number(orderRaw.deliveryFee),
    courierEarning: Number(orderRaw.courierEarning),
    platformFee: Number(orderRaw.platformFee)
  };

  return {
    order
  };
};
