import prisma from '$lib/server/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { Role, OrderStatus, PaymentStatus, DeliveryType, DeliveryStatus } from '@prisma/client';

export const load: PageServerLoad = async () => {
  try {
    // Ambil data customers beserta alamat mereka
    const customers = await prisma.user.findMany({
      where: { role: Role.CUSTOMER },
      include: {
        customerProfile: {
          include: {
            addresses: true
          }
        }
      },
      orderBy: { name: 'asc' }
    });

    // Ambil semua layanan yang aktif
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });

    return {
      customers: JSON.parse(JSON.stringify(customers)),
      services: JSON.parse(JSON.stringify(services))
    };
  } catch (err) {
    console.error("Error loading create order data:", err);
    throw error(500, "Gagal memuat data formulir");
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    
    const customerId = data.get('customerId')?.toString();
    const pickupAddressId = data.get('pickupAddressId')?.toString();
    const serviceId = data.get('serviceId')?.toString();
    const pickupDateStr = data.get('pickupDate')?.toString();
    const weightStr = data.get('weight')?.toString();
    const notes = data.get('notes')?.toString();
    
    if (!customerId || !pickupAddressId || !serviceId || !pickupDateStr) {
      throw error(400, "Semua field yang wajib harus diisi");
    }
    
    const pickupDate = new Date(pickupDateStr);
    const weight = weightStr ? parseFloat(weightStr) : 0;
    
    try {
      // Dapatkan data service untuk hitung subtotal
      const service = await prisma.service.findUnique({
        where: { id: serviceId }
      });
      
      if (!service) {
        throw error(400, "Layanan tidak valid");
      }
      
      const pricePerKg = Number(service.pricePerKg);
      const subtotal = weight > 0 ? pricePerKg * weight : 0;
      
      // Buat nomor order (format: ORD-YYYYMMDD-XXXX)
      const datePart = new Date().toISOString().slice(0,10).replace(/-/g, '');
      const randomPart = Math.floor(1000 + Math.random() * 9000);
      const orderNumber = `ORD-${datePart}-${randomPart}`;
      
      await prisma.order.create({
        data: {
          orderNumber,
          customerId,
          pickupAddressId,
          deliveryAddressId: pickupAddressId, // by default sama dengan pickup
          pickupDate,
          weight: weight > 0 ? weight : null,
          subtotal: subtotal > 0 ? subtotal : null,
          total: subtotal > 0 ? subtotal : null,
          orderStatus: OrderStatus.PENDING,
          paymentStatus: PaymentStatus.UNPAID,
          notes,
          
          items: {
            create: {
              serviceId,
              weight: weight > 0 ? weight : 0,
              price: pricePerKg,
              subtotal: subtotal
            }
          },
          
          statusHistory: {
            create: {
              status: OrderStatus.PENDING,
              notes: "Order created by admin"
            }
          }
        }
      });
      
    } catch (err) {
      console.error("Error creating order:", err);
      throw error(500, "Gagal membuat order. Silakan coba lagi.");
    }
    
    redirect(303, '/admin/orders');
  }
};
