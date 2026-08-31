<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { data, form } = $props();
  let services = $derived(data.services);
  let loading = $state(false);
  let selectedService = $state('');
  let estimatedWeight = $state<number | undefined>(undefined);
  
  let estimatedTotal = $derived(
    (selectedService && estimatedWeight) 
      ? (services.find((s: any) => s.id === selectedService)?.pricePerKg || 0) * estimatedWeight 
      : 0
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Buat Pesanan Baru - Atar Laundry</title>
</svelte:head>

<!-- Premium Background with Orange Gradient and Floating Orbs -->
<div class="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 py-12 px-4 sm:px-6 lg:px-8 font-sans">
  
  <!-- Decorative Floating Orbs -->
  <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
    <div class="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
    <div class="absolute bottom-12 right-12 w-64 h-64 bg-gradient-to-tr from-blue-400 to-indigo-300 rounded-full blur-xl opacity-50"></div>
    <div class="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400 rounded-full blur-lg opacity-30"></div>
  </div>

  <div class="relative z-10 max-w-5xl mx-auto">
    <!-- Back Link -->
    <a href="/dashboard" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6 transition-colors">
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
      Kembali ke Dashboard
    </a>

    <!-- Main Card -->
    <div class="bg-white/90 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden">
      
      <!-- Header Area -->
      <div class="text-center pt-10 pb-6">
        <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Atar Laundry</h1>
        <p class="text-surface-500 mt-2 font-medium">Buat Pesanan Baru</p>
      </div>

      <!-- Fake Step Indicator -->
      <div class="flex justify-center items-center mb-10 px-4">
        <div class="flex items-center w-full max-w-lg">
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-500/30">1</div>
            <span class="text-[10px] mt-2 font-semibold text-surface-700 uppercase tracking-wider">Layanan</span>
          </div>
          <div class="flex-1 h-px bg-surface-200 mx-2 -mt-6"></div>
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-bold text-sm">2</div>
            <span class="text-[10px] mt-2 font-semibold text-surface-500 uppercase tracking-wider">Informasi</span>
          </div>
          <div class="flex-1 h-px bg-surface-200 mx-2 -mt-6"></div>
          <div class="flex flex-col items-center">
            <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center font-bold text-sm">3</div>
            <span class="text-[10px] mt-2 font-semibold text-surface-500 uppercase tracking-wider">Selesai</span>
          </div>
        </div>
      </div>

      {#if form?.error}
        <div class="mx-10 mb-6 p-4 rounded-2xl bg-red-50 text-red-600 border border-red-100 text-sm font-medium text-center">
          {form.error}
        </div>
      {/if}

      <form 
        method="POST"
        use:enhance={() => {
          loading = true;
          return async ({ update }) => {
            await update();
            loading = false;
          };
        }}
        class="px-8 md:px-12 pb-12"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <!-- Left Column: Services -->
          <div class="space-y-6">
            <h2 class="text-sm font-bold text-surface-800 uppercase tracking-wider mb-4 flex items-center">
              <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Pilih Layanan
            </h2>
            
            <input type="hidden" name="serviceId" value={selectedService} required />
            
            <div class="grid gap-4">
              {#each services as service}
                <button 
                  type="button"
                  onclick={() => selectedService = service.id}
                  class="text-left w-full transition-all duration-300 focus:outline-none rounded-2xl border-2 p-5 {selectedService === service.id ? 'border-blue-500 bg-blue-50/50 shadow-md shadow-blue-500/10' : 'border-transparent bg-surface-50 hover:bg-surface-100'}"
                >
                  <div class="flex justify-between items-start">
                    <div>
                      <h3 class="font-bold text-surface-900 text-lg">{service.name}</h3>
                      <p class="text-surface-500 text-xs mt-1 leading-relaxed">{service.description}</p>
                    </div>
                    <div class="bg-white text-blue-600 font-bold px-3 py-1.5 rounded-xl shadow-sm border border-blue-100 text-sm whitespace-nowrap ml-4">
                      {formatCurrency(service.pricePerKg)}/kg
                    </div>
                  </div>
                </button>
              {/each}
            </div>
          </div>

          <!-- Right Column: Details -->
          <div class="space-y-6">
            <h2 class="text-sm font-bold text-surface-800 uppercase tracking-wider mb-4 flex items-center">
              <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Informasi Penjemputan
            </h2>
            
            <div class="space-y-5">
              <div>
                <label for="weight" class="block text-[11px] font-semibold text-surface-500 uppercase tracking-wider mb-2 ml-1">Perkiraan Berat (Kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  name="weight"
                  bind:value={estimatedWeight}
                  min="1"
                  step="0.5"
                  class="w-full px-5 py-4 bg-surface-50 border-transparent rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Contoh: 3"
                  required
                >
              </div>

              <div>
                <label for="address" class="block text-[11px] font-semibold text-surface-500 uppercase tracking-wider mb-2 ml-1">Alamat Lengkap</label>
                <textarea 
                  id="address" 
                  name="address" 
                  rows="3"
                  class="w-full px-5 py-4 bg-surface-50 border-transparent rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Contoh: Jl. Sudirman No. 123. Patokan: Sebelah warung."
                  required
                ></textarea>
              </div>

              <div>
                <label for="notes" class="block text-[11px] font-semibold text-surface-500 uppercase tracking-wider mb-2 ml-1">Catatan Tambahan</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  rows="2"
                  class="w-full px-5 py-4 bg-surface-50 border-transparent rounded-2xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Contoh: Baju putih tolong dipisah."
                ></textarea>
              </div>
            </div>

            <!-- Payment Method -->
            <div class="pt-6 mt-6 border-t border-surface-100 space-y-4">
              <h2 class="text-sm font-bold text-surface-800 uppercase tracking-wider mb-4 flex items-center">
                <span class="w-2 h-2 rounded-full bg-blue-500 mr-2"></span> Metode Pembayaran
              </h2>
              
              <div class="grid grid-cols-1 gap-4">
                <label class="flex items-start gap-4 p-4 rounded-2xl border-2 border-surface-200 cursor-pointer hover:bg-surface-50 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <div class="flex-1">
                    <div class="font-bold text-surface-900 text-sm">Bayar Nanti (Tunai/Transfer)</div>
                    <div class="text-xs text-surface-500 mt-1">Bayar saat kurir mengambil atau mengantar pakaian</div>
                  </div>
                  <input type="radio" name="paymentMethod" value="CASH" class="w-5 h-5 text-blue-600 border-surface-300 focus:ring-blue-500 mt-0.5" checked>
                </label>
                
                <label class="flex items-start gap-4 p-4 rounded-2xl border-2 border-surface-200 cursor-pointer hover:bg-surface-50 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                  <div class="flex-1">
                    <div class="font-bold text-surface-900 text-sm">Saldo AntarLaundry</div>
                    <div class="text-xs mt-1 {data.wallet.balance >= estimatedTotal && estimatedTotal > 0 ? 'text-green-600' : 'text-red-500 font-medium'}">
                      Saldo Anda: {formatCurrency(data.wallet.balance)}
                      {#if estimatedTotal > 0 && data.wallet.balance < estimatedTotal}
                        <br/>(Saldo tidak mencukupi)
                      {/if}
                    </div>
                  </div>
                  <input type="radio" name="paymentMethod" value="SALDO" class="w-5 h-5 text-blue-600 border-surface-300 focus:ring-blue-500 mt-0.5" disabled={estimatedTotal > 0 && data.wallet.balance < estimatedTotal}>
                </label>
              </div>
            </div>

            <!-- Summary & Submit -->
            <div class="pt-6 mt-6 border-t border-surface-100">
              <div class="bg-blue-50 rounded-2xl p-5 mb-6 flex justify-between items-center border border-blue-100">
                <div>
                  <h4 class="font-bold text-surface-900 text-sm">Estimasi Biaya</h4>
                  <p class="text-[11px] text-surface-500 mt-0.5">Dihitung otomatis</p>
                </div>
                <div class="text-2xl font-black text-blue-600">
                  {estimatedTotal > 0 ? formatCurrency(estimatedTotal) : 'Rp 0'}
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={!selectedService || loading}
                class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-blue-500/40 transform transition-all hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex justify-center items-center gap-2 text-lg"
              >
                {#if loading}
                  <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                {:else}
                  Simpan & Lanjutkan
                {/if}
              </button>
            </div>
          </div>
          
        </div>
      </form>
    </div>
  </div>
</div>
