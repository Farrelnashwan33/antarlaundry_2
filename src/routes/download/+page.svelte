<svelte:head>
  <title>Unduh Aplikasi - Antar Laundry</title>
</svelte:head>

<section class="py-24 bg-surface-50 min-h-[70vh]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    <h1 class="text-4xl md:text-5xl font-bold text-surface-900 mb-8">Unduh Aplikasi Mobile</h1>
    <div class="bg-primary rounded-3xl p-8 md:p-14 text-white shadow-xl relative overflow-hidden text-left">
      <!-- Decor -->
      <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
      <div class="absolute -top-10 right-20 w-40 h-40 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
      
      <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-3xl font-bold mb-4">Pengalaman Laundry di Genggaman Tangan</h2>
          <p class="text-primary-100 mb-8">
            Pesan, lacak kurir secara langsung (live-tracking), dan bayar semua dari aplikasi seluler kami yang ringan dan cepat. Tersedia untuk iOS dan Android.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <button class="bg-black hover:bg-surface-900 text-white border border-surface-700 px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 384 512"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              <div class="text-left">
                <div class="text-[10px] leading-tight">Download on the</div>
                <div class="font-bold text-sm leading-tight">App Store</div>
              </div>
            </button>
            <button class="bg-black hover:bg-surface-900 text-white border border-surface-700 px-6 py-3 rounded-xl flex items-center justify-center gap-3 transition">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 512 512"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
              <div class="text-left">
                <div class="text-[10px] leading-tight">GET IT ON</div>
                <div class="font-bold text-sm leading-tight">Google Play</div>
              </div>
            </button>
          </div>
        </div>
        <div class="hidden md:flex justify-end relative">
          <!-- Placeholder phone mockup -->
          <div class="w-48 h-96 bg-surface-900 border-4 border-surface-800 rounded-[2.5rem] shadow-2xl relative overflow-hidden flex items-center justify-center">
            <span class="text-surface-600 font-bold">App Preview</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
