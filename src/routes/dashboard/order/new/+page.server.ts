import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || user.role !== 'CUSTOMER') {
		throw redirect(303, '/dashboard');
	}

	const rawServices = await prisma.service.findMany({
		where: { isActive: true },
		orderBy: { pricePerKg: 'asc' }
	});

	const services = rawServices.map((s) => ({
		...s,
		pricePerKg: Number(s.pricePerKg),
		minPrice: s.minPrice ? Number(s.minPrice) : null
	}));

	const wallet = await prisma.wallet.findUnique({
		where: { userId: user.id }
	});

	return {
		services,
		wallet: wallet ? { balance: Number(wallet.balance) } : { balance: 0 }
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const user = locals.user;
		if (!user) throw redirect(303, '/login');

		const data = await request.formData();
		const serviceId = data.get('serviceId') as string;
		const address = data.get('address') as string;
		const notes = data.get('notes') as string;
		const paymentMethod = (data.get('paymentMethod') as string) || 'CASH';

		if (!serviceId || !address) {
			return fail(400, { error: 'Layanan dan Alamat harus diisi.' });
		}

		try {
			const service = await prisma.service.findUnique({ where: { id: serviceId } });
			if (!service) {
				return fail(400, { error: 'Layanan tidak valid.' });
			}

			const weight = parseFloat(data.get('weight') as string) || 0;
			let effectiveWeight = weight;
			if (service.minWeight && weight > 0 && weight < Number(service.minWeight)) {
				effectiveWeight = Number(service.minWeight);
			} else if (weight === 0) {
				effectiveWeight = Number(service.minWeight || 0);
			}

			let subtotal = Number(service.pricePerKg) * effectiveWeight;
			if (service.minPrice && subtotal < Number(service.minPrice)) {
				subtotal = Number(service.minPrice);
			}
			const deliveryFee = 0;
			const total = subtotal + deliveryFee;

			// Wrap in a transaction to handle Saldo payment safely
			await prisma.$transaction(async (tx) => {
				// 1. Get CustomerProfile
				const userWithProfile = await tx.user.findUnique({
					where: { id: user.id },
					include: { customerProfile: true }
				});

				let profileId = userWithProfile?.customerProfile?.id;
				if (!profileId) {
					const newProfile = await tx.customerProfile.create({
						data: { userId: user.id }
					});
					profileId = newProfile.id;
				}

				// 2. Check Wallet Balance if SALDO is chosen
				let wallet = null;
				if (paymentMethod === 'SALDO') {
					wallet = await tx.wallet.findUnique({ where: { userId: user.id } });
					if (!wallet || Number(wallet.balance) < total) {
						throw new Error('Saldo tidak mencukupi. Silakan top up terlebih dahulu.');
					}
				}

				// 3. Create Address
				const newAddress = await tx.address.create({
					data: {
						customerProfileId: profileId,
						label: 'Alamat Penjemputan',
						fullAddress: address,
						city: 'Kota'
					}
				});

				// 4. Generate Order Number
				const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

				// 5. Create Order
				const newOrder = await tx.order.create({
					data: {
						orderNumber,
						customerId: user.id,
						pickupAddressId: newAddress.id,
						deliveryAddressId: newAddress.id,
						orderStatus: 'PENDING',
						paymentStatus: paymentMethod === 'SALDO' ? 'PAID' : 'UNPAID',
						pickupDate: new Date(),
						notes,
						weight: effectiveWeight,
						subtotal: subtotal,
						deliveryFee: deliveryFee,
						total: total,
						items: {
							create: {
								serviceId: service.id,
								weight: effectiveWeight,
								price: service.pricePerKg,
								subtotal: subtotal
							}
						}
					}
				});

				// 6. Deduct Balance & create payment record if SALDO
				if (paymentMethod === 'SALDO' && wallet) {
					const newBalance = Number(wallet.balance) - total;

					await tx.wallet.update({
						where: { id: wallet.id },
						data: { balance: newBalance }
					});

					await tx.walletTransaction.create({
						data: {
							walletId: wallet.id,
							type: 'PAYMENT',
							amount: total,
							balanceBefore: wallet.balance,
							balanceAfter: newBalance,
							referenceId: newOrder.id,
							description: `Pembayaran Laundry Order #${orderNumber}`,
							status: 'SUCCESS'
						}
					});

					await tx.payment.create({
						data: {
							orderId: newOrder.id,
							amount: total,
							method: 'SALDO',
							status: 'PAID',
							paidAt: new Date()
						}
					});
				}

				// 7. Create Delivery (Pickup Task for Courier)
				await tx.delivery.create({
					data: {
						orderId: newOrder.id,
						type: 'PICKUP',
						status: 'ASSIGNED'
					}
				});
			});
		} catch (err: any) {
			console.error(err);
			return fail(500, { error: err.message || 'Gagal membuat pesanan.' });
		}

		throw redirect(303, '/dashboard?success=Pesanan+berhasil+dibuat');
	}
};
