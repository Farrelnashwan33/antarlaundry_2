import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
  try {
    const userId = "960c198a-06be-4439-9f37-47471e8b9255"; // customer
    const amount = 50000;
    const orderId = `TOPUP-${Date.now()}-${userId.substring(0, 4)}`;

    await prisma.topUp.create({
      data: {
        userId: userId,
        amount: amount,
        orderId: orderId,
        paymentStatus: 'PAID',
        paymentMethod: 'SIMULASI'
      }
    });
    console.log("topUp created");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}
run();
