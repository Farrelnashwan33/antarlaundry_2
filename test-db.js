import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	datasources: {
		db: {
			url: 'postgresql://postgres.brjjvmssakeiabjvgaqu:Farrellaundry21@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true'
		}
	}
});

async function main() {
	try {
		const users = await prisma.user.findMany();
		console.log('Users:', users.length);
		const admin = await prisma.user.findUnique({ where: { email: 'admin@antarlaundry.com' } });
		console.log('Admin exists:', !!admin);
	} catch (e) {
		console.error('DB Error:', e);
	} finally {
		await prisma.$disconnect();
	}
}

main();
