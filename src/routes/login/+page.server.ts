import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { verifyPassword, createSession } from '$lib/server/auth';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		if (locals.user.role === 'ADMIN' || locals.user.role === 'SUPER_ADMIN')
			throw redirect(302, '/admin');
		if (locals.user.role === 'COURIER') throw redirect(302, '/courier');
		throw redirect(302, '/dashboard');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		let userRole = '';
		try {
			const data = await request.formData();

			let email = data.get('email') as string;
			let password = data.get('password') as string;

			email = email?.trim()?.toLowerCase();
			password = password?.trim();

			if (!email || !password) {
				return fail(400, { error: 'Email dan kata sandi harus diisi.' });
			}

			const user = await prisma.user.findUnique({ where: { email } });

			if (!user) {
				return fail(401, { error: 'Email atau kata sandi salah.' });
			}

			const isValid = await verifyPassword(password, user.passwordHash);

			if (!isValid) {
				return fail(401, { error: 'Email atau kata sandi salah.' });
			}

			const token = await createSession(user.id, user.role);
			userRole = user.role;

			cookies.set('session', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'lax',
				secure: !dev,
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});

			// We will handle redirect outside try-catch
		} catch (err: any) {
			console.error('Login Error:', err);
			// Jangan pernah mengekspos raw error Prisma ke client di production
			return fail(500, { error: 'Terjadi kesalahan pada server. Silakan coba lagi.' });
		}

		if (userRole === 'ADMIN' || userRole === 'SUPER_ADMIN') throw redirect(303, '/admin');
		if (userRole === 'COURIER') throw redirect(303, '/courier');
		throw redirect(303, '/dashboard');
	}
};
