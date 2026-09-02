import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
		throw redirect(303, '/login');
	}

	const ordersRaw = await prisma.goLaundryOrder.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			customer: true,
			courier: true
		}
	});

	const orders = ordersRaw.map((order) => ({
		...order,
		deliveryFee: Number(order.deliveryFee),
		courierEarning: Number(order.courierEarning),
		platformFee: Number(order.platformFee)
	}));

	// Stats
	const total = orders.length;
	const waiting = orders.filter((o) => o.status === 'AVAILABLE').length;
	const onDelivery = orders.filter((o) =>
		['ASSIGNED', 'HEADING_TO_PICKUP', 'PICKED_UP', 'ON_DELIVERY'].includes(o.status)
	).length;
	const completed = orders.filter((o) => o.status === 'COMPLETED').length;

	return {
		orders,
		stats: { total, waiting, onDelivery, completed }
	};
};
