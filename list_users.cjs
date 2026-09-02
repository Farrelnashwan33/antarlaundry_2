const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.user.findMany().then(u => {
  console.log(u.map(x => ({ email: x.email, role: x.role, hash: x.passwordHash.substring(0, 10) })));
  prisma.$disconnect();
});
