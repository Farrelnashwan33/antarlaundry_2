import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = locals.user;

	if (!user || user.role !== 'CUSTOMER') {
		throw redirect(303, '/dashboard');
	}

	const address = await prisma.address.findUnique({
		where: { id: params.id },
		include: { customerProfile: true }
	});

	if (!address || address.customerProfile.userId !== user.id) {
		throw redirect(303, '/dashboard/address');
	}

	return {
		address
	};
};

export const actions: Actions = {
	default: async ({ request, params, locals }) => {
		const user = locals.user;
		if (!user) throw redirect(303, '/login');

		const data = await request.formData();
		const label = data.get('label') as string;
		const fullAddress = data.get('fullAddress') as string;
		const city = data.get('city') as string;
		const postalCode = data.get('postalCode') as string;

		if (!label || !fullAddress || !city) {
			return fail(400, { error: 'Label, Alamat Lengkap, dan Kota harus diisi.' });
		}

		try {
			// Verify ownership
			const address = await prisma.address.findUnique({
				where: { id: params.id },
				include: { customerProfile: true }
			});

			if (!address || address.customerProfile.userId !== user.id) {
				return fail(403, { error: 'Tidak memiliki akses untuk mengubah alamat ini.' });
			}

			await prisma.address.update({
				where: { id: params.id },
				data: {
					label,
					fullAddress,
					city,
					postalCode: postalCode || null
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Gagal memperbarui alamat.' });
		}

		throw redirect(303, '/dashboard/address?success=Alamat+berhasil+diperbarui');
	}
};
