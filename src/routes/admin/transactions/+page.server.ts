import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'ADMIN') {
    throw redirect(303, '/dashboard');
  }

  const transactions = await prisma.order.findMany({
    where: {
      orderStatus: 'COMPLETED'
    },
    include: {
      customer: true,
      items: { include: { service: true } }
    },
    orderBy: { createdAt: 'desc' }
  });

  const serializedTransactions = transactions.map(order => ({
    ...order,
    total: order.total ? Number(order.total) : null,
    items: order.items.map(item => ({
      ...item,
      price: Number(item.price),
      subtotal: Number(item.subtotal),
      weight: Number(item.weight)
    }))
  }));

  return {
    transactions: serializedTransactions
  };
};
