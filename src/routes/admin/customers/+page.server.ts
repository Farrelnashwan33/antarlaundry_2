import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    throw redirect(303, '/dashboard');
  }

  const customers = await prisma.user.findMany({
    where: { role: 'CUSTOMER' },
    include: {
      customerProfile: {
        include: { addresses: true }
      },
      orders: {
        select: {
          id: true,
          total: true,
          orderStatus: true,
          createdAt: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  // Calculate stats for each customer and serialize Decimals
  const serializedCustomers = customers.map(customer => {
    const completedOrders = customer.orders.filter(o => o.orderStatus === 'COMPLETED');
    const totalSpent = completedOrders.reduce((acc, curr) => acc + Number(curr.total || 0), 0);
    
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      createdAt: customer.createdAt,
      addresses: customer.customerProfile?.addresses || [],
      orderCount: customer.orders.length,
      completedOrderCount: completedOrders.length,
      totalSpent,
      lastOrderDate: customer.orders.length > 0 
        ? customer.orders.reduce((latest, current) => 
            new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
          ).createdAt 
        : null
    };
  });

  return {
    customers: serializedCustomers
  };
};
