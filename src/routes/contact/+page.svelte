<script lang="ts">
  import { openChat } from '$lib/stores/chat';
</script>

<svelte:head>
  <title>Hubungi CS - Antar Laundry</title>
</svelte:head>

<section class="py-24 bg-surface-50 min-h-[70vh]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-surface-900 mb-8">Hubungi Customer Service</h1>
    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-200 text-left">
      <h2 class="text-2xl font-semibold text-primary mb-4">Kami Siap Membantu Anda 24/7</h2>
      <p class="text-surface-600 mb-8 leading-relaxed">
        Punya kendala dengan pesanan Anda? Atau ingin memberikan saran dan kritik? Tim dukungan pelanggan kami selalu tersedia untuk mendengarkan.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-6 bg-surface-50 border border-surface-200 rounded-2xl text-center">
          <div class="h-12 w-12 mx-auto mb-4 flex items-center justify-center text-primary-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
          </div>
          <h3 class="font-bold text-lg mb-2">Live Chat</h3>
          <p class="text-surface-600 text-sm mb-4">Bicara langsung dengan agen kami via aplikasi.</p>
          <button onclick={openChat} class="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm w-full font-medium">Mulai Chat</button>
        </div>
        <div class="p-6 bg-surface-50 border border-surface-200 rounded-2xl text-center">
          <div class="h-12 w-12 mx-auto mb-4 flex items-center justify-center text-primary-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <h3 class="font-bold text-lg mb-2">Email</h3>
          <p class="text-surface-600 text-sm mb-4">Kirimkan rincian kendala Anda.</p>
          <a href="mailto:haloantarlaundry@gmail.com" class="inline-block bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-sm w-full font-medium">Kirim Email</a>
        </div>
      </div>
    </div>
  </div>
</section>
