import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals, parent }) => {
  await parent();
  const user = locals.user;
  
  if (!user) throw redirect(303, '/login');

  const wallet = await prisma.wallet.findUnique({
    where: { userId: user.id },
    include: {
      transactions: {
        orderBy: { createdAt: 'desc' },
        take: 20
      }
    }
  });

  // Serialize BigInt/Decimal if needed
  const balance = wallet ? Number(wallet.balance) : 0;
  const transactions = wallet ? wallet.transactions.map(t => ({
    ...t,
    amount: Number(t.amount),
    balanceBefore: Number(t.balanceBefore),
    balanceAfter: Number(t.balanceAfter)
  })) : [];

  return {
    wallet: { balance },
    transactions
  };
};
