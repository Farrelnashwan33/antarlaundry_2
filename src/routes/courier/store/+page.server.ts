import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || user.role !== 'COURIER') {
		throw redirect(303, '/dashboard');
	}

	// Global Queue: Deliveries that are waiting for a courier (courierId is null)
	const globalQueue = await prisma.delivery.findMany({
		where: { courierId: null, status: 'ASSIGNED' },
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
		orderBy: { createdAt: 'asc' }
	});

	// Serialize orders inside deliveries to handle Decimal objects from Prisma
	const serializeDelivery = (delivery: any) => ({
		...delivery,
		fee: Number(delivery.fee),
		order: {
			...delivery.order,
			totalAmount: Number(delivery.order.totalAmount),
			deliveryFee: Number(delivery.order.deliveryFee),
			items: delivery.order.items.map((item: any) => ({
				...item,
				price: Number(item.price),
				subtotal: Number(item.subtotal),
				weight: Number(item.weight),
				service: item.service
					? {
							...item.service,
							pricePerKg: Number(item.service.pricePerKg),
							minPrice: item.service.minPrice ? Number(item.service.minPrice) : null
						}
					: null
			}))
		}
	});

	return {
		storeQueue: globalQueue.map(serializeDelivery)
	};
};

export const actions: Actions = {
	acceptTask: async ({ request, locals }) => {
		if (locals.user?.role !== 'COURIER') return fail(403);

		const data = await request.formData();
		const deliveryId = data.get('deliveryId') as string;

		if (!deliveryId) return fail(400);

		const delivery = await prisma.delivery.findUnique({ where: { id: deliveryId } });
		if (!delivery || delivery.courierId) {
			return fail(400, { error: 'Tugas sudah diambil kurir lain atau tidak valid.' });
		}

		// Assign to courier and update status
		await prisma.delivery.update({
			where: { id: deliveryId },
			data: {
				courierId: locals.user.id,
				status: delivery.type === 'PICKUP' ? 'PICKUP' : 'OUT_FOR_DELIVERY'
			}
		});

		if (delivery.type !== 'PICKUP') {
			await prisma.order.update({
				where: { id: delivery.orderId },
				data: { orderStatus: 'DELIVERY' }
			});
		}

		return { success: true };
	}
};
