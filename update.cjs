const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	await prisma.orderItem.update({
		where: { id: 'd6fda31f-f63f-4a51-b601-a306d9676c1f' },
		data: { weight: 3, subtotal: 21000 }
	});

	await prisma.order.update({
		where: { id: '92a253f9-5237-4121-951b-b8accb663943' },
		data: { total: 21000, subtotal: 21000 }
	});

	console.log('Updated order to 3 kg');
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
