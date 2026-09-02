import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'akhmadfarrelnashwan42@gmail.com' } });
  if (!user) {
    console.log("User not found!");
    return;
  }
  console.log("Password hash from DB:", user.passwordHash);
  
  const pw = 'Farrellaundry21';
  const isValid = await bcrypt.compare(pw, user.passwordHash);
  console.log("Is valid?", isValid);
}

main().catch(console.error).finally(() => prisma.$disconnect());
