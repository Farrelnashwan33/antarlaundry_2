import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
		throw redirect(303, '/dashboard');
	}

	const topUps = await prisma.topUp.findMany({
		orderBy: { createdAt: 'desc' },
		include: {
			user: {
				select: { name: true, email: true }
			}
		},
		take: 50
	});

	const aggregate = await prisma.topUp.groupBy({
		by: ['paymentStatus'],
		_count: { paymentStatus: true },
		_sum: { amount: true }
	});

	let stats = {
		total: 0,
		pending: 0,
		success: 0,
		failed: 0,
		totalAmount: 0
	};

	aggregate.forEach((agg) => {
		stats.total += agg._count.paymentStatus;
		if (agg.paymentStatus === 'PAID') {
			stats.success = agg._count.paymentStatus;
			stats.totalAmount = Number(agg._sum.amount || 0);
		} else if (agg.paymentStatus === 'PENDING') {
			stats.pending = agg._count.paymentStatus;
		} else {
			stats.failed += agg._count.paymentStatus;
		}
	});

	const serializedTopUps = topUps.map((t) => ({
		...t,
		amount: Number(t.amount)
	}));

	return {
		topUps: serializedTopUps,
		stats
	};
};
