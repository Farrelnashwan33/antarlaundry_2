const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password', 10);
  await prisma.user.updateMany({
    where: { email: 'admin@antarlaundry.com' },
    data: { passwordHash: hash }
  });
  console.log("Admin password updated to 'password'");
}

main().catch(console.error).finally(() => prisma.$disconnect());
