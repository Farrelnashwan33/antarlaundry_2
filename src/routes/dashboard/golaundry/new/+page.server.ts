import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user || user.role !== 'CUSTOMER') {
		throw redirect(303, '/login');
	}

	// Load addresses to display in the dropdown
	const profile = await prisma.customerProfile.findUnique({
		where: { userId: user.id },
		include: { addresses: true }
	});

	return {
		addresses: profile?.addresses || []
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const user = locals.user;
		if (!user || user.role !== 'CUSTOMER') return fail(403);

		const data = await request.formData();
		const serviceType = data.get('serviceType') as string;
		const vehicleType = data.get('vehicleType') as string;
		const pickupAddress = data.get('pickupAddress') as string;
		const destinationAddress = data.get('destinationAddress') as string;
		const notes = data.get('notes') as string;
		const estimatedWeight = parseFloat(data.get('estimatedWeight') as string) || 0;

		if (!serviceType || !vehicleType || !pickupAddress || !destinationAddress) {
			return fail(400, { error: 'Semua field wajib diisi' });
		}

		// Determine fees based on vehicle
		let baseDeliveryFee = 0;
		if (vehicleType === 'MOTOR') baseDeliveryFee = 15000;
		else if (vehicleType === 'MOTOR_BOX') baseDeliveryFee = 25000;
		else if (vehicleType === 'MOBIL') baseDeliveryFee = 50000;

		if (serviceType === 'PICKUP_AND_DELIVERY') {
			baseDeliveryFee *= 2; // Charge double if both
		}

		const platformFee = 3000;
		const courierEarning = baseDeliveryFee - platformFee;

		// Generate GL order number
		const orderNumber = `GL-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100)}`;

		try {
			const order = await prisma.goLaundryOrder.create({
				data: {
					orderNumber,
					customerId: user.id,
					serviceType: serviceType as any,
					vehicleType: vehicleType as any,
					pickupAddress,
					destinationAddress,
					notes,
					estimatedWeight,
					status: 'AVAILABLE',
					deliveryFee: baseDeliveryFee,
					courierEarning,
					platformFee
				}
			});

			throw redirect(303, `/dashboard/golaundry/${order.id}`);
		} catch (err: any) {
			if (err?.status === 303) throw err;
			console.error(err);
			return fail(500, { error: 'Terjadi kesalahan saat membuat pesanan.' });
		}
	}
};
