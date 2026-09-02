import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { snap } from '$lib/server/midtrans';

export async function POST({ request, locals }) {
	if (!locals.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { amount } = await request.json();

		if (!amount || amount < 10000) {
			return json({ error: 'Minimal top up adalah Rp10.000' }, { status: 400 });
		}

		// Get user details for midtrans
		const user = await prisma.user.findUnique({
			where: { id: locals.user.id },
			select: { name: true, email: true, phone: true }
		});

		if (!user) {
			return json({ error: 'User not found' }, { status: 404 });
		}

		// Create TopUp record in database as SUCCESS
		const orderId = `TOPUP-${Date.now()}-${locals.user.id.substring(0, 4)}`;
		await prisma.topUp.create({
			data: {
				userId: locals.user.id,
				amount: amount,
				orderId: orderId,
				paymentStatus: 'PAID',
				paymentMethod: 'SIMULASI'
			}
		});

		// Directly update Wallet and create WalletTransaction
		const wallet = await prisma.wallet.findUnique({
			where: { userId: locals.user.id }
		});

		let balanceBefore = 0;
		let balanceAfter = amount;
		let walletId = '';

		if (wallet) {
			balanceBefore = Number(wallet.balance);
			balanceAfter = balanceBefore + amount;
			walletId = wallet.id;
			await prisma.wallet.update({
				where: { id: wallet.id },
				data: { balance: balanceAfter }
			});
		} else {
			const newWallet = await prisma.wallet.create({
				data: {
					userId: locals.user.id,
					balance: balanceAfter
				}
			});
			walletId = newWallet.id;
		}

		// Create Wallet Transaction
		await prisma.walletTransaction.create({
			data: {
				walletId: walletId,
				type: 'TOP_UP',
				amount: amount,
				balanceBefore: balanceBefore,
				balanceAfter: balanceAfter,
				referenceId: orderId,
				description: 'Top Up Saldo (Simulasi)',
				status: 'SUCCESS'
			}
		});

		return json({
			success: true,
			orderId: orderId
		});
	} catch (error) {
		console.error('Top Up Error:', error);
		return json({ error: 'Failed to process top up' }, { status: 500 });
	}
}
