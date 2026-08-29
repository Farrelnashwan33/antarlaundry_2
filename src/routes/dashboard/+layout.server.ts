import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user) {
    throw redirect(303, '/login');
  }

  if (user.role === 'ADMIN') {
    throw redirect(303, '/admin');
  }

  if (user.role === 'COURIER') {
    throw redirect(303, '/courier');
  }

  // Fetch full user profile
  const userProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      customerProfile: true,
      courierProfile: true,
    }
  });

  return {
    profile: userProfile,
    user
  };
};
