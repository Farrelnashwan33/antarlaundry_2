<script lang="ts">
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  const services = [
    { title: 'Cuci Komplit', desc: 'Cuci, jemur, dan setrika rapi. Siap pakai!', price: 'Rp 7.000/kg', icon: '🧺' },
    { title: 'Cuci Kering', desc: 'Hanya cuci dan keringkan tanpa setrika.', price: 'Rp 5.000/kg', icon: '💨' },
    { title: 'Setrika Saja', desc: 'Pakaian kusut? Kami setrika hingga mulus.', price: 'Rp 5.000/kg', icon: '👔' },
    { title: 'Cuci Sepatu', desc: 'Sepatu kotor jadi seperti baru lagi.', price: 'Mulai Rp 25.000', icon: '👟' },
  ];

  const steps = [
    { num: '1', title: 'Pesan', desc: 'Pesan layanan via aplikasi dengan mudah.' },
    { num: '2', title: 'Jemput', desc: 'Kurir kami akan menjemput pakaian kotor Anda.' },
    { num: '3', title: 'Cuci', desc: 'Pakaian dicuci dengan hati-hati dan bersih.' },
    { num: '4', title: 'Antar', desc: 'Pakaian bersih dan wangi diantar kembali.' },
  ];
</script>

<!-- Hero Section -->
<section class="relative pt-24 pb-32 overflow-hidden bg-primary-50">
  <div class="absolute inset-0 z-0">
    <!-- Decorative background elements -->
    <div class="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
    <div class="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
  </div>
  
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="text-center max-w-3xl mx-auto fade-in">
      <Badge variant="primary" class="mb-6">🚀 Layanan Antar Jemput Gratis!</Badge>
      <h1 class="text-5xl md:text-6xl font-extrabold text-surface-900 tracking-tight leading-tight mb-6">
        Laundry Bersih, <br/>
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-500">
          Tanpa Perlu Keluar Rumah
        </span>
      </h1>
      <p class="text-xl text-surface-600 mb-10 max-w-2xl mx-auto">
        Antar Laundry siap menyelesaikan masalah cucian kotor Anda. Pesan sekarang, kurir kami jemput, dan pakaian kembali dalam keadaan bersih, wangi, dan rapi.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button href="/register" size="lg" class="w-full sm:w-auto">Mulai Pesan Sekarang</Button>
        <Button href="#cara-kerja" variant="outline" size="lg" class="w-full sm:w-auto">Pelajari Cara Kerja</Button>
      </div>
    </div>
  </div>
</section>

<!-- Layanan Section -->
<section id="layanan" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-surface-900 mb-4">Layanan Unggulan Kami</h2>
      <p class="text-lg text-surface-600 max-w-2xl mx-auto">Pilih layanan yang sesuai dengan kebutuhan Anda. Kami menggunakan deterjen premium dan mesin berteknologi tinggi.</p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each services as service}
        <Card hoverable padding="lg" class="text-center">
          <div class="w-16 h-16 mx-auto bg-primary-50 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-primary-100">
            {service.icon}
          </div>
          <h3 class="text-xl font-bold text-surface-900 mb-2">{service.title}</h3>
          <p class="text-surface-600 mb-4 h-12">{service.desc}</p>
          <div class="inline-block bg-surface-50 px-4 py-2 rounded-lg font-semibold text-primary-700">
            {service.price}
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- Cara Kerja Section -->
<section id="cara-kerja" class="py-24 bg-surface-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-3xl md:text-4xl font-bold text-surface-900 mb-4">Cara Kerja Antar Laundry</h2>
      <p class="text-lg text-surface-600 max-w-2xl mx-auto">Cukup 4 langkah mudah untuk mendapatkan pakaian bersih tanpa repot.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
      <div class="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-surface-200 -translate-y-1/2 z-0"></div>
      
      {#each steps as step}
        <div class="relative z-10 text-center">
          <div class="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg shadow-primary-200 border-4 border-surface-50 mb-6 hover-scale">
            {step.num}
          </div>
          <h3 class="text-xl font-bold text-surface-900 mb-2">{step.title}</h3>
          <p class="text-surface-600">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20 relative overflow-hidden bg-surface-900">
  <div class="absolute inset-0 overflow-hidden">
    <div class="absolute -top-1/2 -right-1/4 w-full h-full bg-gradient-to-b from-primary-600 to-transparent opacity-20 rounded-full blur-3xl"></div>
  </div>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">Siap Menikmati Kemudahan Laundry?</h2>
    <p class="text-xl text-surface-300 mb-10">Bergabunglah dengan ribuan pelanggan yang telah mempercayakan pakaian mereka kepada Antar Laundry.</p>
    <Button href="/register" size="lg" class="!bg-white !text-surface-900 hover:!bg-surface-50">Daftar Sekarang</Button>
  </div>
</section>

<style>
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
</style>
