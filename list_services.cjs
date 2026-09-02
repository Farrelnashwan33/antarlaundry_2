const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.service.findMany().then(s => {
  console.log(s);
  prisma.$disconnect();
});
