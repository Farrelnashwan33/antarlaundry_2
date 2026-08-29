<script lang="ts">
  // Formulir akan dikirim langsung ke email menggunakan formsubmit.co
  // Tidak perlu endpoint server khusus
</script>

<svelte:head>
  <title>Formulir Kemitraan - Antar Laundry</title>
</svelte:head>

<section class="py-24 bg-surface-50 min-h-screen">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold text-surface-900 mb-4">Formulir Kemitraan Vendor</h1>
      <p class="text-surface-600">Bergabunglah sebagai vendor cuci berstandar tinggi untuk Antar Laundry.</p>
    </div>
    
    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-200">
      <!-- Endpoint FormSubmit diarahkan ke email yang diminta -->
      <form action="https://formsubmit.co/haloantarlaundry@gmail.com" method="POST" class="space-y-8">
        
        <!-- Konfigurasi FormSubmit -->
        <!-- Ganti URL ini dengan URL production Anda nanti jika sudah di-hosting -->
        <input type="hidden" name="_next" value="http://localhost:5173/partners?success=true">
        <input type="hidden" name="_subject" value="PENDAFTARAN MITRA VENDOR BARU">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_template" value="table">

        <!-- Bagian 1: Informasi Usaha -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">1</span>
            <h3 class="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 flex-grow">Informasi Usaha</h3>
          </div>
          
          <div class="grid grid-cols-1 gap-6 pl-11">
            <div class="space-y-2">
              <label for="businessName" class="text-sm font-medium text-surface-700">Nama Laundry / Usaha <span class="text-red-500">*</span></label>
              <input type="text" id="businessName" name="Nama Usaha" required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Contoh: Berkah Laundry">
            </div>
            
            <div class="space-y-2">
              <label for="address" class="text-sm font-medium text-surface-700">Alamat Lengkap Workshop <span class="text-red-500">*</span></label>
              <textarea id="address" name="Alamat Workshop" required rows="3" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Masukkan alamat lengkap workshop Anda..."></textarea>
            </div>
          </div>
        </div>

        <!-- Bagian 2: Detail Kontak -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">2</span>
            <h3 class="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 flex-grow">Detail Kontak</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
            <div class="space-y-2">
              <label for="ownerName" class="text-sm font-medium text-surface-700">Nama Pemilik <span class="text-red-500">*</span></label>
              <input type="text" id="ownerName" name="Nama Pemilik" required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Nama lengkap Anda">
            </div>
            
            <div class="space-y-2">
              <label for="phone" class="text-sm font-medium text-surface-700">Nomor WhatsApp <span class="text-red-500">*</span></label>
              <input type="tel" id="phone" name="WhatsApp" required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="08123456789">
            </div>
            
            <div class="space-y-2 md:col-span-2">
              <label for="email" class="text-sm font-medium text-surface-700">Alamat Email Aktif <span class="text-red-500">*</span></label>
              <input type="email" id="email" name="email" required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="email@contoh.com">
            </div>
          </div>
        </div>

        <!-- Bagian 3: Kapasitas & Fasilitas -->
        <div>
          <div class="flex items-center gap-3 mb-4">
            <span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">3</span>
            <h3 class="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 flex-grow">Kapasitas & Fasilitas</h3>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
            <div class="space-y-2">
              <label for="capacity" class="text-sm font-medium text-surface-700">Kapasitas Cuci (Kg/Hari) <span class="text-red-500">*</span></label>
              <input type="number" id="capacity" name="Kapasitas (Kg per Hari)" required min="10" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Misal: 100">
            </div>
            
            <div class="space-y-2">
              <label for="machines" class="text-sm font-medium text-surface-700">Jml. Mesin Cuci/Pengering <span class="text-red-500">*</span></label>
              <input type="number" id="machines" name="Jumlah Mesin Komersial" required min="1" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Misal: 5">
            </div>
          </div>
        </div>
        
        <div class="pt-6 pl-11">
          <button type="submit" class="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition transform hover:-translate-y-1">
            Kirim Pendaftaran
          </button>
        </div>
        
      </form>
    </div>
  </div>
</section>
