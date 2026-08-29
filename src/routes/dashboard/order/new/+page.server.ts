import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
  const user = locals.user;
  
  if (!user || user.role !== 'CUSTOMER') {
    throw redirect(303, '/dashboard');
  }

  const rawServices = await prisma.service.findMany({
    where: { isActive: true },
    orderBy: { pricePerKg: 'asc' }
  });

  const services = rawServices.map(s => ({
    ...s,
    pricePerKg: Number(s.pricePerKg),
    minPrice: s.minPrice ? Number(s.minPrice) : null
  }));

  return {
    services
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const user = locals.user;
    if (!user) throw redirect(303, '/login');

    const data = await request.formData();
    const serviceId = data.get('serviceId') as string;
    const address = data.get('address') as string;
    const notes = data.get('notes') as string;

    if (!serviceId || !address) {
      return fail(400, { error: 'Layanan dan Alamat harus diisi.' });
    }

    try {
      const service = await prisma.service.findUnique({ where: { id: serviceId } });
      if (!service) {
        return fail(400, { error: 'Layanan tidak valid.' });
      }

      // 1. Get CustomerProfile
      const userWithProfile = await prisma.user.findUnique({
        where: { id: user.id },
        include: { customerProfile: true }
      });
      
      let profileId = userWithProfile?.customerProfile?.id;
      if (!profileId) {
        const newProfile = await prisma.customerProfile.create({
          data: { userId: user.id }
        });
        profileId = newProfile.id;
      }

      // 2. Create Address
      const newAddress = await prisma.address.create({
        data: {
          customerProfileId: profileId,
          label: 'Alamat Penjemputan',
          fullAddress: address,
          city: 'Kota'
        }
      });

      // 3. Generate Order Number
      const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

      const weight = parseFloat(data.get('weight') as string) || 0;
      
      let effectiveWeight = weight;
      if (service.minWeight && weight > 0 && weight < Number(service.minWeight)) {
        effectiveWeight = Number(service.minWeight);
      } else if (weight === 0) {
        effectiveWeight = Number(service.minWeight || 0); // Jika belum ditimbang, set minimal
      }

      let subtotal = Number(service.pricePerKg) * effectiveWeight;
      if (service.minPrice && subtotal < Number(service.minPrice)) {
        subtotal = Number(service.minPrice);
      }

      // Default ongkir 0, jika ada nanti bisa diubah admin
      const deliveryFee = 0;
      const total = subtotal + deliveryFee;

      // 4. Create Order
      const newOrder = await prisma.order.create({
        data: {
          orderNumber,
          customerId: user.id,
          pickupAddressId: newAddress.id,
          deliveryAddressId: newAddress.id,
          orderStatus: 'PENDING',
          paymentStatus: 'UNPAID',
          pickupDate: new Date(),
          notes,
          weight: effectiveWeight,
          subtotal: subtotal,
          deliveryFee: deliveryFee,
          total: total,
          items: {
            create: {
              serviceId: service.id,
              weight: effectiveWeight, 
              price: service.pricePerKg,
              subtotal: subtotal
            }
          }
        }
      });

      // 5. Create Delivery (Pickup Task for Courier)
      await prisma.delivery.create({
        data: {
          orderId: newOrder.id,
          type: 'PICKUP',
          status: 'ASSIGNED' // ASSIGNED means it's in the global queue waiting for a courier
        }
      });

    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Gagal membuat pesanan.' });
    }

    throw redirect(303, '/dashboard?success=Pesanan+berhasil+dibuat');
  }
};
