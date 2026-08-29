const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const service = await prisma.service.findFirst();
  console.log("Updating service:", service.id);
  await prisma.service.update({
    where: { id: service.id },
    data: {
      minWeight: null,
      minPrice: null
    }
  });
  console.log("Success");
}

main().catch(console.error).finally(() => prisma.$disconnect());
