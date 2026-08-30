import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    throw redirect(303, '/dashboard');
  }

  const staffUsers = await prisma.user.findMany({
    include: {
      courierProfile: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return {
    staffUsers
  };
};

export const actions: Actions = {
  changeRole: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') return fail(403);
    
    const data = await request.formData();
    const userId = data.get('userId') as string;
    const role = data.get('role') as string;

    if (!userId || !role) return fail(400);

    // Validate role enum
    if (!['ADMIN', 'COURIER', 'STAFF', 'CUSTOMER'].includes(role)) {
      return fail(400, { error: 'Invalid role' });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role: role as any }
    });

    return { success: true };
  },

  addStaff: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') return fail(403);
    
    const data = await request.formData();
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const password = data.get('password') as string;
    const role = data.get('role') as string;

    if (!name || !email || !password || !role) {
      return fail(400, { error: 'Missing required fields' });
    }

    if (!['ADMIN', 'COURIER', 'STAFF'].includes(role)) {
      return fail(400, { error: 'Invalid role' });
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return fail(400, { error: 'Email already exists' });
    }

    // Hash the password inline or import auth.ts (inline is safer since I don't want to break imports)
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.default.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        passwordHash: hashedPassword,
        role: role as any
      }
    });

    if (role === 'COURIER') {
      await prisma.courierProfile.create({
        data: {
          userId: newUser.id,
          vehicleType: 'Motorcycle',
          status: 'AVAILABLE'
        }
      });
    }

    return { success: true };
  },

  updateStaff: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') return fail(403);
    
    const data = await request.formData();
    const userId = data.get('userId') as string;
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const role = data.get('role') as string;
    const password = data.get('password') as string;

    if (!userId || !name || !email || !role) {
      return fail(400, { error: 'Missing required fields' });
    }

    if (!['ADMIN', 'COURIER', 'STAFF', 'CUSTOMER'].includes(role)) {
      return fail(400, { error: 'Invalid role' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return fail(404, { error: 'User not found' });

    let updateData: any = {
      name,
      email,
      phone: phone || null,
      role: role as any
    };

    if (password && password.trim() !== '') {
      const bcrypt = await import('bcryptjs');
      updateData.passwordHash = await bcrypt.default.hash(password.trim(), 10);
    }

    await prisma.user.update({
      where: { id: userId },
      data: updateData
    });

    if (role === 'COURIER' && user.role !== 'COURIER') {
      // Create courier profile if they are becoming a courier
      const existingProfile = await prisma.courierProfile.findUnique({ where: { userId } });
      if (!existingProfile) {
        await prisma.courierProfile.create({
          data: {
            userId: userId,
            vehicleType: 'Motorcycle',
            status: 'AVAILABLE'
          }
        });
      }
    }

    return { success: true };
  },

  deleteStaff: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') return fail(403);
    
    const data = await request.formData();
    const userId = data.get('userId') as string;

    if (!userId) return fail(400, { error: 'Missing user ID' });

    // Prevent deleting oneself
    if (userId === locals.user.id) {
      return fail(400, { error: 'Cannot delete yourself' });
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    return { success: true };
  }
};
