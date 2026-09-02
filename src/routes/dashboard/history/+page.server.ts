import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user) return { orders: [] };

	const orders = await prisma.order.findMany({
		where: {
			customerId: user.id,
			orderStatus: { in: ['COMPLETED', 'CANCELLED'] }
		},
		include: {
			items: {
				include: {
					service: true
				}
			},
			deliveries: true
		},
		orderBy: { createdAt: 'desc' }
	});

	const serializedOrders = orders.map((order) => ({
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
			service: item.service
				? {
						...item.service,
						pricePerKg: Number(item.service.pricePerKg),
						minPrice: item.service.minPrice ? Number(item.service.minPrice) : null
					}
				: null
		}))
	}));

	return {
		orders: serializedOrders
	};
};
