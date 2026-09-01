import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'COURIER') {
    throw redirect(303, '/dashboard');
  }

  // Load Courier Profile
  const profile = await prisma.courierProfile.findUnique({
    where: { userId: user.id }
  });

  // Global Queue Count: Deliveries that are waiting for a courier (courierId is null)
  const globalQueueCount = await prisma.delivery.count({
    where: { courierId: null, status: 'ASSIGNED' }
  });

  // Active Deliveries: Deliveries accepted by this courier that are not finished
  const activeDeliveries = await prisma.delivery.findMany({
    where: { 
      courierId: user.id, 
      status: { notIn: ['DELIVERED', 'FAILED'] }
    },
    include: {
      order: {
        include: {
          customer: true,
          pickupAddress: true,
          deliveryAddress: true,
          items: { include: { service: true } }
        }
      }
    },
    orderBy: { updatedAt: 'desc' }
  });

  // Stats for the charts
  const totalCompleted = await prisma.delivery.count({
    where: { courierId: user.id, status: 'DELIVERED' }
  });
  
  const allTasksCount = globalQueueCount + activeDeliveries.length + totalCompleted;

  // Serialize orders inside deliveries to handle Decimal objects from Prisma
  const serializeDelivery = (delivery: any) => ({
    ...delivery,
    order: {
      ...delivery.order,
      subtotal: delivery.order.subtotal ? Number(delivery.order.subtotal) : null,
      deliveryFee: delivery.order.deliveryFee ? Number(delivery.order.deliveryFee) : null,
      discount: delivery.order.discount ? Number(delivery.order.discount) : null,
      total: delivery.order.total ? Number(delivery.order.total) : null,
      items: delivery.order.items.map((item: any) => ({
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
    }
  });

  return {
    activeDeliveries: activeDeliveries.map(serializeDelivery),
    stats: {
      totalTasks: allTasksCount,
      globalQueueCount: globalQueueCount,
      activeCount: activeDeliveries.length,
      completedCount: totalCompleted
    },
    profile
  };
};

export const actions: Actions = {
  toggleOnline: async ({ request, locals }) => {
    if (locals.user?.role !== 'COURIER') return fail(403);
    
    const profile = await prisma.courierProfile.findUnique({
      where: { userId: locals.user.id }
    });
    
    if (profile) {
      await prisma.courierProfile.update({
        where: { id: profile.id },
        data: { isOnline: !profile.isOnline }
      });
    }
    return { success: true };
  },

  updateVehicle: async ({ request, locals }) => {
    if (locals.user?.role !== 'COURIER') return fail(403);
    const data = await request.formData();
    const vehicleType = data.get('vehicleType') as string;

    if (!['MOTOR', 'MOTOR_BOX', 'MOBIL'].includes(vehicleType)) {
      return fail(400, { error: 'Invalid vehicle type' });
    }

    await prisma.courierProfile.upsert({
      where: { userId: locals.user.id },
      update: { vehicleType: vehicleType as any },
      create: { userId: locals.user.id, vehicleType: vehicleType as any }
    });

    return { success: true };
  },

  completeTask: async ({ request, locals }) => {
    if (locals.user?.role !== 'COURIER') return fail(403);
    
    const data = await request.formData();
    const deliveryId = data.get('deliveryId') as string;
    const orderId = data.get('orderId') as string;

    if (!deliveryId || !orderId) return fail(400);

    const delivery = await prisma.delivery.findUnique({ where: { id: deliveryId } });
    if (!delivery || delivery.courierId !== locals.user.id) return fail(403);

    // Mark delivery as delivered
    await prisma.delivery.update({
      where: { id: deliveryId },
      data: { status: 'DELIVERED', completedAt: new Date() }
    });

    if (delivery.type === 'PICKUP') {
      await prisma.order.update({
        where: { id: orderId },
        data: { orderStatus: 'PICKUP' }
      });
    } else {
      await prisma.order.update({
        where: { id: orderId },
        data: { 
          orderStatus: 'COMPLETED',
          paymentStatus: 'PAID' // Asumsi kurir menerima pembayaran COD
        }
      });
    }

    return { success: true };
  }
};
