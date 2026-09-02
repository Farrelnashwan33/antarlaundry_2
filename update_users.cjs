const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
	const hash = await bcrypt.hash('password', 10);
	await prisma.user.updateMany({
		data: { passwordHash: hash }
	});
	console.log("All user passwords updated to 'password'");
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
