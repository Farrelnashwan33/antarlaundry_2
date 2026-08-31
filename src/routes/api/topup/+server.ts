import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { snap } from '$lib/server/midtrans';

export async function POST({ request, locals }) {
  if (!locals.user) {
    return json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { amount } = await request.json();

    if (!amount || amount < 10000) {
      return json({ error: 'Minimal top up adalah Rp10.000' }, { status: 400 });
    }

    // Get user details for midtrans
    const user = await prisma.user.findUnique({
      where: { id: locals.user.id },
      select: { name: true, email: true, phone: true }
    });

    if (!user) {
      return json({ error: 'User not found' }, { status: 404 });
    }

    // Create TopUp record in database
    const topUp = await prisma.topUp.create({
      data: {
        userId: locals.user.id,
        amount: amount,
        orderId: `TOPUP-${Date.now()}-${locals.user.id.substring(0, 4)}`,
        paymentStatus: 'PENDING'
      }
    });

    // Request snap token
    const parameter = {
      transaction_details: {
        order_id: topUp.orderId,
        gross_amount: amount
      },
      customer_details: {
        first_name: user.name,
        email: user.email,
        phone: user.phone || ''
      }
    };

    const transaction = await snap.createTransaction(parameter);

    return json({ 
      token: transaction.token,
      redirect_url: transaction.redirect_url,
      orderId: topUp.orderId
    });
  } catch (error) {
    console.error('Top Up Error:', error);
    return json({ error: 'Failed to create top up transaction' }, { status: 500 });
  }
}
