const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const services = await prisma.service.findMany();
  console.log("Services:", services);
  
  const orderItems = await prisma.orderItem.findMany();
  console.log("OrderItems:", orderItems);
}

main().catch(console.error).finally(() => prisma.$disconnect());
