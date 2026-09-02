import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log('Start seeding...');

	// 1. Create Services
	const washDry = await prisma.service.create({
		data: {
			name: 'Cuci Cepat Kering',
			description: 'Layanan cuci dan kering cepat tanpa setrika',
			pricePerKg: 7000,
			estimatedDays: 1
		}
	});

	const washIron = await prisma.service.create({
		data: {
			name: 'Cuci + Setrika',
			description: 'Cuci bersih dan setrika rapi',
			pricePerKg: 10000,
			estimatedDays: 2
		}
	});

	const express = await prisma.service.create({
		data: {
			name: 'Express',
			description: 'Layanan kilat 1 hari selesai, cuci + setrika',
			pricePerKg: 15000,
			estimatedDays: 1
		}
	});

	// 2. Create Users
	// In production, NEVER use plain text passwords. We are just using a dummy hash here.
	// In the real app, we will use bcryptjs or similar.
	const passwordHash = 'dummy-hash-password-123'; // Assume this is a bcrypt hash

	const admin = await prisma.user.create({
		data: {
			name: 'Admin Laundry',
			email: 'admin@antarlaundry.com',
			passwordHash,
			phone: '081234567890',
			role: Role.ADMIN
		}
	});

	const courier = await prisma.user.create({
		data: {
			name: 'Kurir Andi',
			email: 'courier@antarlaundry.com',
			passwordHash,
			phone: '081234567891',
			role: Role.COURIER,
			courierProfile: {
				create: {
					vehicleType: 'Motor',
					plateNumber: 'D 1234 AB'
				}
			}
		}
	});

	const customer = await prisma.user.create({
		data: {
			name: 'Farrel Customer',
			email: 'customer@antarlaundry.com',
			passwordHash,
			phone: '081234567892',
			role: Role.CUSTOMER,
			customerProfile: {
				create: {
					addresses: {
						create: [
							{
								label: 'Rumah',
								fullAddress: 'Jl. Merdeka No. 1, Bandung',
								city: 'Bandung',
								postalCode: '40111'
							}
						]
					}
				}
			}
		},
		include: {
			customerProfile: {
				include: { addresses: true }
			}
		}
	});

	console.log('Seeding finished.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
