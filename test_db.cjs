const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const orders = await prisma.order.findMany();
  console.log(orders.map(o => ({ id: o.id, status: o.orderStatus, total: o.total })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
