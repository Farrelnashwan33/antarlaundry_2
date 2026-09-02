import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
		throw redirect(303, '/dashboard');
	}

	const allOrders = await prisma.order.findMany({
		include: {
			items: true
		},
		orderBy: { createdAt: 'desc' }
	});

	const stats = {
		totalRevenue: allOrders
			.filter((o) => o.orderStatus === 'COMPLETED')
			.reduce((acc, curr) => acc + Number(curr.total || 0), 0),
		totalOrders: allOrders.length,
		completedOrders: allOrders.filter((o) => o.orderStatus === 'COMPLETED').length,
		pendingOrders: allOrders.filter(
			(o) => o.orderStatus === 'PENDING' || o.orderStatus === 'PICKUP'
		).length,
		inProgressOrders: allOrders.filter((o) =>
			['PROCESSING', 'WASHING', 'DRYING', 'IRONING', 'READY'].includes(o.orderStatus)
		).length
	};

	return {
		stats
	};
};
