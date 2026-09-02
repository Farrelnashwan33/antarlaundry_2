import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;
	if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
		throw redirect(303, '/login');
	}

	const couriersRaw = await prisma.user.findMany({
		where: { role: 'COURIER' },
		include: {
			courierProfile: true,
			_count: {
				select: {
					goLaundryCourierOrders: {
						where: {
							status: 'COMPLETED'
						}
					}
				}
			}
		}
	});

	const couriers = couriersRaw.map((courier) => ({
		id: courier.id,
		name: courier.name,
		email: courier.email,
		phone: courier.phone,
		isOnline: courier.courierProfile?.isOnline || false,
		vehicleType: courier.courierProfile?.vehicleType || 'MOTOR',
		licensePlate: courier.courierProfile?.licensePlate || '-',
		completedOrders: courier._count.goLaundryCourierOrders
	}));

	const onlineCouriers = couriers.filter((c) => c.isOnline).length;

	return {
		couriers,
		stats: {
			total: couriers.length,
			online: onlineCouriers,
			offline: couriers.length - onlineCouriers
		}
	};
};
