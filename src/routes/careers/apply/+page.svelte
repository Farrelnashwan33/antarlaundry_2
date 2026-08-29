<script lang="ts">
  import { enhance } from '$app/forms';
  import { page } from '$app/stores';
  
  let { form } = $props();
  let loading = $state(false);
  let success = $state(form?.success || false);
  
  // Default position based on query param if available
  let selectedPosition = $state($page.url.searchParams.get('role') === 'cs' ? 'CS' : 'RIDER');
</script>

<svelte:head>
  <title>Formulir Lamaran Kerja - Antar Laundry</title>
</svelte:head>

<section class="py-24 bg-surface-50 min-h-screen">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-10">
      <h1 class="text-3xl md:text-4xl font-bold text-surface-900 mb-4">Formulir Pendaftaran Karir</h1>
      <p class="text-surface-600">Bergabunglah dengan tim operasional & kesuksesan pelanggan Antar Laundry.</p>
    </div>
    
    <div class="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-surface-200">
      {#if success}
        <div class="text-center py-12">
          <div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✅</div>
          <h2 class="text-2xl font-bold text-surface-900 mb-2">Lamaran Berhasil Dikirim!</h2>
          <p class="text-surface-600 mb-8">Terima kasih telah melamar. Tim rekrutmen kami akan meninjau profil Anda dan menghubungi Anda melalui Email atau WhatsApp dalam waktu 2x24 Jam.</p>
          <a href="/careers" class="inline-block bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-medium transition">Kembali ke Karir</a>
        </div>
      {:else}
        {#if form?.error}
          <div class="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
            {form.error}
          </div>
        {/if}
      
        <form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { await update(); loading = false; success = form?.success || false; } }} class="space-y-8">
          
          <!-- Section 1: Basic Details -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">1</span>
              <h3 class="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 flex-grow">Informasi Dasar</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
              <div class="space-y-2">
                <label for="fullName" class="text-sm font-medium text-surface-700">Nama Lengkap Sesuai KTP *</label>
                <input type="text" id="fullName" name="fullName" required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Masukkan nama lengkap">
              </div>
              
              <div class="space-y-2">
                <label for="position" class="text-sm font-medium text-surface-700">Posisi yang Dilamar *</label>
                <select id="position" name="position" bind:value={selectedPosition} required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white">
                  <option value="RIDER">Kurir Operasional (Rider)</option>
                  <option value="CS">Customer Success Staff</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label for="dob" class="text-sm font-medium text-surface-700">Tanggal Lahir</label>
                <input type="date" id="dob" name="dob" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition text-surface-700">
              </div>
              
              <div class="space-y-2">
                <label class="text-sm font-medium text-surface-700 block mb-2">Jenis Kelamin</label>
                <div class="flex items-center gap-6 mt-3">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="Laki-laki" class="text-primary focus:ring-primary w-4 h-4">
                    <span class="text-surface-700">Laki-laki</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="gender" value="Perempuan" class="text-primary focus:ring-primary w-4 h-4">
                    <span class="text-surface-700">Perempuan</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 2: Contact Details -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">2</span>
              <h3 class="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 flex-grow">Detail Kontak</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
              <div class="space-y-2">
                <label for="email" class="text-sm font-medium text-surface-700">Alamat Email Aktif *</label>
                <input type="email" id="email" name="email" required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="email@contoh.com">
              </div>
              
              <div class="space-y-2">
                <label for="phone" class="text-sm font-medium text-surface-700">Nomor WhatsApp *</label>
                <input type="tel" id="phone" name="phone" required class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="08123456789">
              </div>
              
              <div class="space-y-2 md:col-span-2">
                <label for="address" class="text-sm font-medium text-surface-700">Alamat Domisili Lengkap</label>
                <textarea id="address" name="address" rows="3" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none" placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Selatan..."></textarea>
              </div>
            </div>
          </div>
          
          <!-- Section 3: Education & Background -->
          <div>
            <div class="flex items-center gap-3 mb-4">
              <span class="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">3</span>
              <h3 class="text-lg font-bold text-surface-900 border-b border-surface-200 pb-2 flex-grow">Pendidikan Terakhir</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
              <div class="space-y-2">
                <label for="educationDegree" class="text-sm font-medium text-surface-700">Tingkat Pendidikan</label>
                <select id="educationDegree" name="educationDegree" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white text-surface-700">
                  <option value="">- Pilih Tingkat -</option>
                  <option value="SMA/SMK">SMA / SMK Sederajat</option>
                  <option value="D3">Diploma 3 (D3)</option>
                  <option value="S1">Sarjana (S1)</option>
                </select>
              </div>
              
              <div class="space-y-2">
                <label for="educationSchool" class="text-sm font-medium text-surface-700">Nama Institusi / Sekolah</label>
                <input type="text" id="educationSchool" name="educationSchool" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition" placeholder="Contoh: Universitas Indonesia / SMAN 1">
              </div>
            </div>
          </div>
          
          <!-- Submit Button -->
          <div class="pt-8 mt-8 border-t border-surface-200">
            <button type="submit" disabled={loading} class="w-full md:w-auto md:px-12 md:mx-auto md:block bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg transition disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-orange-500/20">
              {loading ? 'Menyimpan...' : 'Kirim Pendaftaran'}
            </button>
            <p class="text-center text-xs text-surface-500 mt-4">
              Dengan mengeklik Kirim Pendaftaran, Anda menyetujui pemrosesan data untuk keperluan seleksi karyawan.
            </p>
          </div>
          
        </form>
      {/if}
    </div>
  </div>
</section>
