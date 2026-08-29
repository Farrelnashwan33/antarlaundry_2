import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';
import { hashPassword, createSession } from '$lib/server/auth';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) {
    throw redirect(302, '/dashboard');
  }
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const password = data.get('password') as string;
    const role = (data.get('role') as string) || 'CUSTOMER'; // Allow registering as CUSTOMER or COURIER for demo

    if (!name || !email || !password || !phone) {
      return fail(400, { error: 'Semua field harus diisi.' });
    }
    
    if (password.length < 8) {
      return fail(400, { error: 'Kata sandi harus minimal 8 karakter.' });
    }

    try {
      // Check if email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return fail(400, { error: 'Email sudah terdaftar.' });
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          passwordHash: hashedPassword,
          role: role === 'COURIER' ? 'COURIER' : 'CUSTOMER',
          ...(role === 'CUSTOMER' ? {
            customerProfile: {
              create: {}
            }
          } : {}),
          ...(role === 'COURIER' ? {
            courierProfile: {
              create: {
                plateNumber: 'Belum diisi',
                vehicleType: 'MOTOR'
              }
            }
          } : {})
        }
      });
      // Redirect to login page
    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Terjadi kesalahan pada server.' });
    }

    throw redirect(303, '/login?success=register');
  }
};
