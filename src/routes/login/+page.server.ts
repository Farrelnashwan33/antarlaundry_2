import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { verifyPassword, createSession } from '$lib/server/auth';
import { dev } from '$app/environment';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    if (locals.user.role === 'ADMIN') throw redirect(302, '/admin');
    if (locals.user.role === 'COURIER') throw redirect(302, '/courier');
    throw redirect(302, '/dashboard');
  }
};

const loginAttempts = new Map<string, { count: number, timestamp: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export const actions: Actions = {
  default: async ({ request, cookies, getClientAddress }) => {
    // Basic Rate Limiting
    const ip = getClientAddress();
    const now = Date.now();
    const attempt = loginAttempts.get(ip);
    
    if (attempt && now - attempt.timestamp < LOCKOUT_TIME && attempt.count >= MAX_ATTEMPTS) {
      return fail(429, { error: 'Terlalu banyak percobaan login. Silakan coba lagi nanti.' });
    }

    const data = await request.formData();
    
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
      return fail(400, { error: 'Email dan kata sandi harus diisi.' });
    }

    let userRole = '';
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      
      if (!user) {
        loginAttempts.set(ip, { count: (attempt?.count || 0) + 1, timestamp: now });
        return fail(401, { error: 'Email atau kata sandi salah.' });
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      
      if (!isValid) {
        loginAttempts.set(ip, { count: (attempt?.count || 0) + 1, timestamp: now });
        return fail(401, { error: 'Email atau kata sandi salah.' });
      }

      // Reset attempts on success
      loginAttempts.delete(ip);

      const token = await createSession(user.id, user.role);
      userRole = user.role;
      
      cookies.set('session', token, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        secure: !dev,
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Terjadi kesalahan pada server.' });
    }
    
    if (userRole === 'ADMIN') throw redirect(303, '/admin');
    if (userRole === 'COURIER') throw redirect(303, '/courier');
    throw redirect(303, '/dashboard');
  }
};
