import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user || user.role !== 'COURIER') {
		throw redirect(303, '/dashboard');
	}

	// Find active orders for this courier
	const activeOrdersRaw = await prisma.goLaundryOrder.findMany({
		where: {
			courierId: user.id,
			status: { notIn: ['COMPLETED', 'CANCELLED'] }
		},
		orderBy: { updatedAt: 'desc' }
	});

	const activeOrders = activeOrdersRaw.map((order) => ({
		...order,
		deliveryFee: Number(order.deliveryFee),
		courierEarning: Number(order.courierEarning),
		platformFee: Number(order.platformFee)
	}));

	return {
		activeOrders
	};
};

export const actions: Actions = {
	updateStatus: async ({ request, locals }) => {
		const user = locals.user;
		if (!user || user.role !== 'COURIER') return fail(403);

		const data = await request.formData();
		const orderId = data.get('orderId') as string;
		const nextStatus = data.get('status') as string;

		if (!orderId || !nextStatus) return fail(400, { error: 'Invalid data' });

		const validStatuses = ['HEADING_TO_PICKUP', 'PICKED_UP', 'ON_DELIVERY', 'COMPLETED'];
		if (!validStatuses.includes(nextStatus)) return fail(400, { error: 'Invalid status' });

		try {
			const order = await prisma.goLaundryOrder.findUnique({ where: { id: orderId } });
			if (!order || order.courierId !== user.id) return fail(403);

			await prisma.goLaundryOrder.update({
				where: { id: orderId },
				data: { status: nextStatus as any }
			});

			// If completed, add earning to Wallet (if Wallet exists).
			// Based on prompt, we just track it. If Wallet logic exists, we should integrate it.
			if (nextStatus === 'COMPLETED') {
				const wallet = await prisma.wallet.findUnique({ where: { userId: user.id } });
				if (wallet) {
					await prisma.walletTransaction.create({
						data: {
							walletId: wallet.id,
							type: 'PAYMENT',
							amount: order.courierEarning,
							balanceBefore: wallet.balance,
							balanceAfter: Number(wallet.balance) + Number(order.courierEarning),
							referenceId: order.orderNumber,
							description: 'Penghasilan Go Laundry',
							status: 'SUCCESS'
						}
					});

					await prisma.wallet.update({
						where: { id: wallet.id },
						data: { balance: Number(wallet.balance) + Number(order.courierEarning) }
					});
				}
			}

			return { success: true };
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Gagal update status.' });
		}
	}
};
