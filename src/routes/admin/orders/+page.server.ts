import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'ADMIN') {
    throw redirect(303, '/dashboard');
  }

  const allOrders = await prisma.order.findMany({
    include: {
      customer: true,
      items: { include: { service: true } },
      deliveries: { include: { courier: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Serialize orders to handle Decimal objects from Prisma
  const serializedOrders = allOrders.map(order => ({
    ...order,
    subtotal: order.subtotal ? Number(order.subtotal) : null,
    deliveryFee: order.deliveryFee ? Number(order.deliveryFee) : null,
    discount: order.discount ? Number(order.discount) : null,
    total: order.total ? Number(order.total) : null,
    items: order.items.map(item => ({
      ...item,
      price: Number(item.price),
      subtotal: Number(item.subtotal),
      weight: Number(item.weight),
      service: item.service ? {
        ...item.service,
        pricePerKg: Number(item.service.pricePerKg),
        minPrice: item.service.minPrice ? Number(item.service.minPrice) : null
      } : null
    }))
  }));

  return {
    orders: serializedOrders
  };
};
