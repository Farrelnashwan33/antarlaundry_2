import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals, parent }) => {
  await parent();
  const user = locals.user;
  
  if (!user) return { activeOrders: [], totalSpent: 0 };
  
  // If customer, fetch their active orders
  let activeOrders: any[] = [];
  let totalSpent: number = 0;

  if (user.role === 'CUSTOMER') {
    activeOrders = await prisma.order.findMany({
      where: {
        customerId: user.id,
        orderStatus: {
          notIn: ['COMPLETED', 'CANCELLED']
        }
      },
      include: {
        items: {
          include: {
            service: true
          }
        },
        deliveries: true
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Calculate total spent for completed orders
    const completedOrders = await prisma.order.findMany({
      where: {
        customerId: user.id,
        orderStatus: 'COMPLETED'
      },
      select: {
        total: true,
        subtotal: true
      }
    });

    totalSpent = completedOrders.reduce((acc, order) => acc + Number(order.total || order.subtotal || 0), 0);
  }

  // Serialize activeOrders because Prisma Decimal types cannot be passed directly to SvelteKit
  const serializedOrders = activeOrders.map(order => ({
    ...order,
    subtotal: order.subtotal ? Number(order.subtotal) : null,
    deliveryFee: order.deliveryFee ? Number(order.deliveryFee) : null,
    discount: order.discount ? Number(order.discount) : null,
    total: order.total ? Number(order.total) : null,
    items: order.items.map((item: any) => ({
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

  const activePromoRaw = await prisma.promo.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' }
  });

  const activePromo = activePromoRaw ? {
    ...activePromoRaw,
    discountAmt: activePromoRaw.discountAmt ? Number(activePromoRaw.discountAmt) : null
  } : null;

  return {
    activeOrders: serializedOrders,
    totalSpent,
    activePromo
  };
};
