import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Fallback ke database lokal MAMP (hanya bisa jalan di komputer lokal)
const fallbackUrl = 'mysql://root:root@localhost:8889/antar_laundry';
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
