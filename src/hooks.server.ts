import { verifySession } from '$lib/server/auth';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get('session');

	if (sessionToken) {
		const session = await verifySession(sessionToken);
		if (session) {
			event.locals.user = {
				id: session.userId,
				role: session.role
			};
		}
	}

	const { pathname } = event.url;
	const user = event.locals.user;

	// Protect Dashboard routes
	if (pathname.startsWith('/dashboard')) {
		if (!user) {
			throw redirect(303, '/login');
		}
	}

	// Protect Courier routes
	if (pathname.startsWith('/courier')) {
		if (!user) {
			throw redirect(303, '/login');
		}
		if (user.role !== 'COURIER' && user.role !== 'ADMIN') {
			throw redirect(303, '/dashboard');
		}
	}

	// Protect Admin routes
	if (pathname.startsWith('/admin')) {
		if (!user) {
			throw redirect(303, '/login');
		}
		if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
			throw redirect(303, '/dashboard');
		}

		// Protect Super Admin only routes
		const superAdminRoutes = [
			'/admin/users',
			'/admin/promos',
			'/admin/analytics',
			'/admin/applications'
		];
		if (
			superAdminRoutes.some((route) => pathname.startsWith(route)) &&
			user.role !== 'SUPER_ADMIN'
		) {
			throw redirect(303, '/admin');
		}
	}

	const response = await resolve(event);

	// Add Security Headers
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

	return response;
};
