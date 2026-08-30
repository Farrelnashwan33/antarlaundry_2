import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const fallbackUrl = 'postgresql://postgres.brjjvmssakeiabjvgaqu:Farrellaundry21@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';
const databaseUrl = env.DATABASE_URL || process.env.DATABASE_URL || fallbackUrl;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
