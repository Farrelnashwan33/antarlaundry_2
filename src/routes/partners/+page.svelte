<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Panduan Mitra - Antar Laundry</title>
</svelte:head>

<section class="py-24 bg-surface-50 min-h-[70vh]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-surface-900 mb-8">Panduan Mitra & Vendor</h1>
    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-200 text-left">
      <h2 class="text-2xl font-semibold text-primary mb-4">Cara Bergabung Menjadi Vendor Cuci</h2>
      <p class="text-surface-600 mb-6 leading-relaxed">
        Apakah Anda pemilik usaha laundry (mesin cuci industri) dan ingin menjadi bagian dari rantai suplai Antar Laundry? Kami membuka kesempatan kemitraan (franchise/vendor) dengan standar kualitas tinggi.
      </p>
      
      {#if $page.url.searchParams.get('success') === 'true'}
        <div class="mb-8 p-6 bg-green-50 rounded-2xl border border-green-200 text-center">
          <div class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✅</div>
          <h3 class="text-xl font-bold text-green-800 mb-2">Pendaftaran Berhasil Terkirim!</h3>
          <p class="text-green-700">Terima kasih telah mendaftar. Tim kami akan segera meninjau aplikasi Anda dan menghubungi Anda.</p>
        </div>
      {/if}

      <div class="p-6 bg-primary-50 rounded-xl border border-primary-100">
        <h3 class="font-bold text-primary-900 mb-2">Persyaratan Kemitraan:</h3>
        <ul class="list-disc list-inside text-primary-800 space-y-2 text-sm">
          <li>Memiliki minimal 5 set mesin cuci & pengering komersial.</li>
          <li>Area pengeringan indoor bebas debu.</li>
          <li>Kapasitas produksi minimal 100 Kg/hari.</li>
          <li>Bersedia mengikuti SOP deterjen yang kami sediakan.</li>
        </ul>
      </div>
      <div class="mt-8 text-center">
        <a href="/partners/apply" class="inline-block bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-xl font-medium transition transform hover:-translate-y-1">Daftar Menjadi Mitra</a>
      </div>
    </div>
  </div>
</section>
