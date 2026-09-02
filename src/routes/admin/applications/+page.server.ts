import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	try {
		// Ambil semua data pelamar dan urutkan berdasarkan waktu pendaftaran terbaru
		const applications = await prisma.jobApplication.findMany({
			orderBy: { createdAt: 'desc' }
		});

		return {
			applications: JSON.parse(JSON.stringify(applications))
		};
	} catch (error) {
		console.error('Error loading job applications:', error);
		return {
			applications: []
		};
	}
};
