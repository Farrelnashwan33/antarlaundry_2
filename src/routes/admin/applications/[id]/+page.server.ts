import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const { id } = params;
  
  const application = await prisma.jobApplication.findUnique({
    where: { id }
  });
  
  if (!application) {
    throw error(404, 'Data pelamar tidak ditemukan');
  }
  
  return {
    application
  };
};

export const actions = {
  accept: async ({ params }) => {
    const { id } = params;
    
    const app = await prisma.jobApplication.update({
      where: { id },
      data: { status: 'ACCEPTED' }
    });
    
    // Format the phone number (change 08 to 628)
    let waNumber = app.phone.replace(/[^0-9]/g, ''); // Remove non-numeric
    if (waNumber.startsWith('0')) {
      waNumber = '62' + waNumber.substring(1);
    }
    
    const position = app.position === 'CS' ? 'Customer Success Staff' : 'Go Laundry (Mitra)';
    const message = `Halo ${app.fullName}, selamat! 🎉\n\nKami dari tim HRD Antar Laundry ingin mengabarkan bahwa lamaran Anda untuk posisi *${position}* telah kami nyatakan *LAYAK & DITERIMA*.\n\nSilakan balas pesan ini untuk informasi dan instruksi lebih lanjut. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    const waLink = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    
    throw redirect(303, waLink);
  },
  
  reject: async ({ params }) => {
    const { id } = params;
    
    await prisma.jobApplication.update({
      where: { id },
      data: { status: 'REJECTED' }
    });
    
    throw redirect(303, '/admin/applications');
  }
} satisfies Actions;
