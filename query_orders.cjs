const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	const orders = await prisma.order.findMany();
	console.log('Orders:', orders);
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
