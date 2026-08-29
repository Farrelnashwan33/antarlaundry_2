const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const service = await prisma.service.findFirst({ where: { name: 'Cuci Cepat Kering' } });
  console.log("Service:", service);
}

main().catch(console.error).finally(() => prisma.$disconnect());
