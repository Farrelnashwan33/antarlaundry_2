<svelte:head>
  <title>Referensi API - Antar Laundry</title>
</svelte:head>

<section class="py-24 bg-surface-50 min-h-[70vh]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-surface-900 mb-8">Referensi API</h1>
    <div class="bg-surface-900 p-8 md:p-12 rounded-3xl shadow-sm text-left">
      <h2 class="text-2xl font-semibold text-white mb-4">AntarLaundry API v1 (BETA)</h2>
      <p class="text-surface-300 mb-8 leading-relaxed">
        Untuk developer dan mitra korporat yang ingin mengintegrasikan layanan laundry B2B (seperti pembersihan seragam karyawan atau linen hotel) ke dalam sistem mereka sendiri.
      </p>
      
      <div class="bg-surface-800 rounded-xl p-4 overflow-x-auto font-mono text-sm text-surface-300">
        <p class="text-primary-400 mb-2">// Mendapatkan Estimasi Harga</p>
        <p><span class="text-pink-400">POST</span> /api/v1/estimate</p>
        <p class="mt-2 text-green-400">Body:</p>
        <pre><code>&#123;
  "serviceId": "CUCI_KOMPLIT",
  "weightKg": 15,
  "pickupLocation": &#123;
    "lat": -6.2088,
    "lng": 106.8456
  &#125;
&#125;</code></pre>
      </div>
      
      <div class="mt-8 text-center">
        <button class="bg-white text-surface-900 hover:bg-surface-100 px-6 py-3 rounded-xl font-medium">Minta Akses Kunci API</button>
      </div>
    </div>
  </div>
</section>
