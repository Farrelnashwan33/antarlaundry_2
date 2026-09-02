import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  try {
    const userId = "960c198a-06be-4439-9f37-47471e8b9255";
    const amount = 50000;
    const orderId = `TOPUP-2`;
    const wallet = await prisma.wallet.findUnique({
      where: { userId: userId }
    });

    let balanceBefore = 0;
    let balanceAfter = amount;
    let walletId = '';

    if (wallet) {
      balanceBefore = Number(wallet.balance);
      balanceAfter = balanceBefore + amount;
      walletId = wallet.id;
      await prisma.wallet.update({
        where: { id: wallet.id },
        data: { balance: balanceAfter }
      });
    } else {
      const newWallet = await prisma.wallet.create({
        data: {
          userId: userId,
          balance: balanceAfter
        }
      });
      walletId = newWallet.id;
    }

    await prisma.walletTransaction.create({
      data: {
        walletId: walletId,
        type: 'TOPUP',
        amount: amount,
        balanceBefore: balanceBefore,
        balanceAfter: balanceAfter,
        referenceId: orderId,
        description: 'Top Up Saldo (Simulasi)',
        status: 'SUCCESS'
      }
    });
    console.log("Success");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
