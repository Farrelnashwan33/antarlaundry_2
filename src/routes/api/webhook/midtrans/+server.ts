import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import crypto from 'crypto';
import { env } from '$env/dynamic/private';
import { coreApi } from '$lib/server/midtrans';

export async function POST({ request }) {
	try {
		const notification = await request.json();

		// Verify signature key to ensure request is from Midtrans
		const serverKey = env.MIDTRANS_SERVER_KEY || '';
		const hash = crypto
			.createHash('sha512')
			.update(
				notification.order_id + notification.status_code + notification.gross_amount + serverKey
			)
			.digest('hex');

		if (hash !== notification.signature_key) {
			return json({ error: 'Invalid signature key' }, { status: 403 });
		}

		const { order_id, transaction_status, fraud_status, payment_type } = notification;

		// Verify using Midtrans API to be absolutely sure
		const statusResponse = await coreApi.transaction.notification(notification);

		if (statusResponse.order_id !== order_id) {
			return json({ error: 'Invalid notification' }, { status: 400 });
		}

		// Determine our internal status
		let status = 'PENDING';
		if (transaction_status == 'capture') {
			if (fraud_status == 'accept') {
				status = 'PAID';
			}
		} else if (transaction_status == 'settlement') {
			status = 'PAID';
		} else if (
			transaction_status == 'cancel' ||
			transaction_status == 'deny' ||
			transaction_status == 'expire'
		) {
			status = 'FAILED';
		} else if (transaction_status == 'pending') {
			status = 'PENDING';
		}

		// Begin Database Transaction to ensure atomicity
		await prisma.$transaction(async (tx) => {
			// Find the TopUp record and lock it
			const topUp = await tx.topUp.findUnique({
				where: { orderId: order_id }
			});

			if (!topUp) {
				throw new Error('TopUp not found');
			}

			// If already processed, do nothing (Idempotency)
			if (topUp.paymentStatus === 'PAID' || topUp.paymentStatus === 'FAILED') {
				return;
			}

			// Update TopUp status
			await tx.topUp.update({
				where: { orderId: order_id },
				data: {
					paymentStatus: status as any,
					paymentMethod: payment_type
				}
			});

			// If PAID, increment wallet balance
			if (status === 'PAID') {
				// Upsert wallet if doesn't exist
				const wallet = await tx.wallet.upsert({
					where: { userId: topUp.userId },
					create: {
						userId: topUp.userId,
						balance: 0
					},
					update: {}
				});

				const newBalance = Number(wallet.balance) + Number(topUp.amount);

				// Update Wallet Balance
				await tx.wallet.update({
					where: { id: wallet.id },
					data: {
						balance: newBalance
					}
				});

				// Record Transaction
				await tx.walletTransaction.create({
					data: {
						walletId: wallet.id,
						type: 'TOP_UP',
						amount: topUp.amount,
						balanceBefore: wallet.balance,
						balanceAfter: newBalance,
						referenceId: topUp.orderId,
						description: `Top Up via ${payment_type || 'Midtrans'}`,
						status: 'SUCCESS'
					}
				});
			}
		});

		return json({ success: true });
	} catch (error) {
		console.error('Webhook Error:', error);
		return json({ error: 'Internal Server Error' }, { status: 500 });
	}
}
