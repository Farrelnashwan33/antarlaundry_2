import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
		throw redirect(303, '/dashboard');
	}

	const allOrders = await prisma.order.findMany({
		include: {
			customer: true,
			items: { include: { service: true } },
			deliveries: { include: { courier: true } }
		},
		orderBy: { createdAt: 'desc' }
	});

	const couriers = await prisma.user.findMany({
		where: { role: 'COURIER' },
		include: { courierProfile: true }
	});

	const stats = {
		pending: allOrders.filter((o) => o.orderStatus === 'PENDING' || o.orderStatus === 'PICKUP')
			.length,
		inProgress: allOrders.filter((o) =>
			['PROCESSING', 'WASHING', 'DRYING', 'IRONING', 'READY'].includes(o.orderStatus)
		).length,
		completed: allOrders.filter((o) => o.orderStatus === 'COMPLETED').length,
		revenue: allOrders
			.filter((o) => o.orderStatus === 'COMPLETED' || o.paymentStatus === 'PAID')
			.reduce((acc, curr) => acc + Number(curr.total || 0), 0)
	};

	// Serialize orders to handle Decimal objects from Prisma
	const serializedOrders = allOrders.map((order) => ({
		...order,
		subtotal: order.subtotal ? Number(order.subtotal) : null,
		deliveryFee: order.deliveryFee ? Number(order.deliveryFee) : null,
		discount: order.discount ? Number(order.discount) : null,
		total: order.total ? Number(order.total) : null,
		items: order.items.map((item) => ({
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
		orders: serializedOrders,
		couriers,
		stats
	};
};

export const actions: Actions = {
	setWeightAndPrice: async ({ request, locals }) => {
		if (locals.user?.role !== 'ADMIN') return fail(403);

		const data = await request.formData();
		const orderId = data.get('orderId') as string;
		const itemId = data.get('itemId') as string;
		let weightStr = data.get('weight') as string;

		if (!weightStr) return fail(400);
		weightStr = weightStr.replace(',', '.');
		const weight = parseFloat(weightStr);

		if (!orderId || !itemId || isNaN(weight)) return fail(400);

		const item = await prisma.orderItem.findUnique({
			where: { id: itemId },
			include: { service: true }
		});
		if (!item) return fail(404);

		let effectiveWeight = weight;
		if (item.service.minWeight && weight < Number(item.service.minWeight)) {
			effectiveWeight = Number(item.service.minWeight);
		}

		let subtotal = Number(item.price) * effectiveWeight;
		if (item.service.minPrice && subtotal < Number(item.service.minPrice)) {
			subtotal = Number(item.service.minPrice);
		}

		// Update item weight & subtotal
		await prisma.orderItem.update({
			where: { id: itemId },
			data: { weight, subtotal }
		});

		// Update order total
		const allItems = await prisma.orderItem.findMany({ where: { orderId } });
		const newSubtotal = allItems.reduce((acc, curr) => acc + Number(curr.subtotal), 0);

		const order = await prisma.order.findUnique({ where: { id: orderId } });
		if (!order) return fail(404);

		const deliveryFee = Number(order.deliveryFee || 0);
		const discount = Number(order.discount || 0);
		const newTotal = newSubtotal + deliveryFee - discount;

		const updateData: any = { subtotal: newSubtotal, total: newTotal };
		if (order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP') {
			updateData.orderStatus = 'PROCESSING';
		}

		await prisma.order.update({
			where: { id: orderId },
			data: updateData
		});

		return { success: true };
	},

	sendToCourier: async ({ request, locals }) => {
		if (locals.user?.role !== 'ADMIN') return fail(403);

		const data = await request.formData();
		const orderId = data.get('orderId') as string;

		if (!orderId) return fail(400);

		await prisma.order.update({
			where: { id: orderId },
			data: { orderStatus: 'READY' }
		});

		// Create a new Delivery task for return trip in the global queue
		await prisma.delivery.create({
			data: {
				orderId,
				type: 'RETURN',
				status: 'ASSIGNED'
			}
		});

		return { success: true };
	},

	acceptOrder: async ({ request, locals }) => {
		if (locals.user?.role !== 'ADMIN') return fail(403);

		const data = await request.formData();
		const orderId = data.get('orderId') as string;

		if (!orderId) return fail(400);

		// Get order to ensure it's pending
		const order = await prisma.order.findUnique({ where: { id: orderId } });
		if (!order || (order.orderStatus !== 'PENDING' && order.orderStatus !== 'PICKUP'))
			return fail(400);

		if (order.paymentStatus !== 'PAID') {
			return fail(400, { error: 'Pesanan belum dibayar (UNPAID). Tidak bisa memproses pesanan.' });
		}

		await prisma.order.update({
			where: { id: orderId },
			data: { orderStatus: 'PROCESSING' }
		});

		return { success: true };
	},

	updateOrderStatus: async ({ request, locals }) => {
		if (locals.user?.role !== 'ADMIN' && locals.user?.role !== 'SUPER_ADMIN') return fail(403);

		const data = await request.formData();
		const orderId = data.get('orderId') as string;
		const status = data.get('status') as any;

		if (!orderId || !status) return fail(400);

		const order = await prisma.order.findUnique({ where: { id: orderId } });
		if (!order) return fail(404);

		if (order.paymentStatus !== 'PAID' && status !== 'CANCELLED') {
			return fail(400, { error: 'Pesanan belum dibayar.' });
		}

		await prisma.order.update({
			where: { id: orderId },
			data: { orderStatus: status }
		});

		// Create history
		await prisma.orderStatusHistory.create({
			data: {
				orderId,
				status,
				notes: `Status diubah menjadi ${status} oleh Admin`
			}
		});

		return { success: true };
	},

	deleteOrder: async ({ request, locals }) => {
		if (locals.user?.role !== 'ADMIN') return fail(403);

		const data = await request.formData();
		const orderId = data.get('orderId') as string;

		if (!orderId) return fail(400);

		// Delete the order (cascade will delete items, deliveries, etc. based on schema)
		await prisma.order.delete({
			where: { id: orderId }
		});

		return { success: true };
	}
};
