import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user || user.role !== 'CUSTOMER') {
		throw redirect(303, '/dashboard');
	}

	// Get the customer profile
	const userWithProfile = await prisma.user.findUnique({
		where: { id: user.id },
		include: { customerProfile: true }
	});

	const profileId = userWithProfile?.customerProfile?.id;

	let addresses: any[] = [];
	if (profileId) {
		addresses = await prisma.address.findMany({
			where: { customerProfileId: profileId },
			orderBy: { createdAt: 'desc' }
		});
	}

	return {
		addresses
	};
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		const user = locals.user;
		if (!user) throw redirect(303, '/login');

		const data = await request.formData();
		const addressId = data.get('id') as string;

		if (!addressId) {
			return fail(400, { error: 'ID Alamat tidak ditemukan.' });
		}

		try {
			// Verify ownership first
			const address = await prisma.address.findUnique({
				where: { id: addressId },
				include: { customerProfile: true }
			});

			if (!address || address.customerProfile.userId !== user.id) {
				return fail(403, { error: 'Tidak memiliki akses.' });
			}

			await prisma.address.delete({
				where: { id: addressId }
			});
		} catch (err) {
			console.error(err);
			return fail(500, { error: 'Gagal menghapus alamat.' });
		}

		return { success: true };
	}
};
