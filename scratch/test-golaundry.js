const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findFirst({ where: { role: 'CUSTOMER' } });
  if (!user) return console.log('No user');
  const profile = await prisma.customerProfile.findUnique({
    where: { userId: user.id },
    include: { addresses: true }
  });
  console.log(profile);
}
main().catch(console.error).finally(() => prisma.$disconnect());
