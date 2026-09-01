import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding data untuk Supabase/MySQL...');
  
  // Password yang unik dan rumit sesuai aturan baru
  const adminPasswordHash = await bcrypt.hash('Admin@123!', 10);
  const customerPasswordHash = await bcrypt.hash('Customer@123!', 10);
  
  // Buat Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@atarlaundry.com' },
    update: {},
    create: {
      name: 'Admin Laundry',
      email: 'admin@atarlaundry.com',
      phone: '081234567890',
      passwordHash: adminPasswordHash,
      role: 'ADMIN',
    },
  });

  // Buat Customer
  const customer = await prisma.user.upsert({
    where: { email: 'customer@atarlaundry.com' },
    update: {},
    create: {
      name: 'Budi Customer',
      email: 'customer@atarlaundry.com',
      phone: '081987654321',
      passwordHash: customerPasswordHash,
      role: 'CUSTOMER',
      customerProfile: {
        create: {}
      }
    },
  });
  
  console.log('Seeding selesai. Data berhasil dimasukkan:');
  console.log('- Admin: admin@atarlaundry.com (Password: Admin@123!)');
  console.log('- Customer: customer@atarlaundry.com (Password: Customer@123!)');
}

main()
  .catch((e) => {
    console.error('Error saat seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
