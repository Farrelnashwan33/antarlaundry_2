import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
		throw redirect(303, '/dashboard');
	}

	const services = await prisma.service.findMany({
		orderBy: { createdAt: 'desc' }
	});

	const serializedServices = services.map((service) => ({
		...service,
		pricePerKg: Number(service.pricePerKg),
		minPrice: service.minPrice ? Number(service.minPrice) : null
	}));

	return {
		services: serializedServices
	};
};

export const actions: Actions = {
	createService: async ({ request, locals }) => {
		if (locals.user?.role !== 'ADMIN') return fail(403);

		const data = await request.formData();
		const name = data.get('name') as string;
		const description = data.get('description') as string;
		const pricePerKg = parseFloat(data.get('pricePerKg') as string);
		const estimatedDays = parseInt(data.get('estimatedDays') as string);
		const minWeightRaw = data.get('minWeight') as string;
		const minPriceRaw = data.get('minPrice') as string;

		const minWeight = minWeightRaw ? parseFloat(minWeightRaw.replace(',', '.')) : null;
		const minPrice = minPriceRaw ? parseFloat(minPriceRaw.replace(',', '.')) : null;

		if (!name || isNaN(pricePerKg) || isNaN(estimatedDays)) {
			return fail(400, { error: 'Invalid input' });
		}

		await prisma.service.create({
			data: {
				name,
				description,
				pricePerKg,
				estimatedDays,
				minWeight,
				minPrice
			}
		});

		return { success: true };
	},

	updateService: async ({ request, locals }) => {
		if (locals.user?.role !== 'ADMIN') return fail(403);

		const data = await request.formData();
		const serviceId = data.get('serviceId') as string;
		const pricePerKg = parseFloat(data.get('pricePerKg') as string);
		const estimatedDays = parseInt(data.get('estimatedDays') as string);
		const isActive = data.get('isActive') === 'on' || data.get('isActive') === 'true';
		const minWeightRaw = data.get('minWeight') as string;
		const minPriceRaw = data.get('minPrice') as string;

		const minWeight = minWeightRaw ? parseFloat(minWeightRaw.replace(',', '.')) : null;
		const minPrice = minPriceRaw ? parseFloat(minPriceRaw.replace(',', '.')) : null;

		if (!serviceId || isNaN(pricePerKg) || isNaN(estimatedDays)) {
			return fail(400, { error: 'Invalid input' });
		}

		await prisma.service.update({
			where: { id: serviceId },
			data: {
				pricePerKg,
				estimatedDays,
				isActive,
				minWeight,
				minPrice
			}
		});

		return { success: true };
	}
};
