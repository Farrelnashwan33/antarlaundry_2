import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || user.role !== 'COURIER') {
		throw redirect(303, '/dashboard');
	}

	// Finished Deliveries: Deliveries completed by this courier
	const finishedDeliveries = await prisma.delivery.findMany({
		where: {
			courierId: user.id,
			status: 'DELIVERED'
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
		finishedDeliveries: finishedDeliveries.map(serializeDelivery)
	};
};
