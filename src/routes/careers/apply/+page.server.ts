import { fail } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const position = data.get('position')?.toString() || '';
		const fullName = data.get('fullName')?.toString() || '';
		const email = data.get('email')?.toString() || '';
		const phone = data.get('phone')?.toString() || '';
		const dobString = data.get('dob')?.toString();
		const gender = data.get('gender')?.toString() || '';
		const address = data.get('address')?.toString() || '';
		const educationDegree = data.get('educationDegree')?.toString() || '';
		const educationSchool = data.get('educationSchool')?.toString() || '';

		if (!position || !fullName || !email || !phone) {
			return fail(400, { error: 'Mohon lengkapi data wajib (Nama, Email, No. HP, Posisi).' });
		}

		let dob = null;
		if (dobString) {
			dob = new Date(dobString);
		}

		try {
			await prisma.jobApplication.create({
				data: {
					position,
					fullName,
					email,
					phone,
					dob,
					gender,
					address,
					educationDegree,
					educationSchool
				}
			});

			return { success: true };
		} catch (e) {
			console.error('Job application error:', e);
			return fail(500, { error: 'Terjadi kesalahan saat mengirim lamaran. Silakan coba lagi.' });
		}
	}
} satisfies Actions;
