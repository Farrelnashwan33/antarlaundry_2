const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.service.delete({
  where: { id: '37bd38da-3721-4b66-b668-847b1ad89779' }
}).then(s => {
  console.log("Deleted service:", s.name);
  prisma.$disconnect();
}).catch(e => {
  console.error("Error deleting:", e.message);
  prisma.$disconnect();
});
