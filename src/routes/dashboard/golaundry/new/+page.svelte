<script lang="ts">
  import { enhance } from '$app/forms';

  let { data, form } = $props();
  let addresses = $derived(data.addresses);
  
  let selectedVehicle = $state('MOTOR');
  let selectedService = $state('PICKUP_AND_DELIVERY');
  
  const vehicles = [
    { id: 'MOTOR', name: 'Motor', desc: 'Maks. 10 kg', icon: '🛵', price: 15000 },
    { id: 'MOTOR_BOX', name: 'Motor Box', desc: 'Maks. 20 kg', icon: '🛺', price: 25000 },
    { id: 'MOBIL', name: 'Mobil', desc: 'Maks. 50 kg', icon: '🚗', price: 50000 }
  ];
  
  let currentPrice = $derived.by(() => {
    const v = vehicles.find(v => v.id === selectedVehicle);
    let p = v ? v.price : 15000;
    if (selectedService === 'PICKUP_AND_DELIVERY') p *= 2;
    return p;
  });
</script>

<svelte:head>
  <title>Pesan Go Laundry</title>
</svelte:head>

<div class="max-w-3xl mx-auto w-full">
  <div class="flex items-center gap-3 mb-8">
    <div class="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-sm shadow-blue-600/30">
      🛵
    </div>
    <div>
      <h1 class="text-2xl font-black text-surface-900 leading-tight">GO LAUNDRY</h1>
      <p class="text-surface-500 text-sm">Antar-Jemput Laundry Lebih Cepat</p>
    </div>
  </div>

  {#if form?.error}
    <div class="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm border border-red-100 font-medium">
      {form.error}
    </div>
  {/if}

  <form method="POST" use:enhance class="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-surface-200">
    
    <div class="mb-8">
      <h3 class="font-bold text-surface-900 mb-4">Pilih Jenis Layanan</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <label class="cursor-pointer">
          <input type="radio" name="serviceType" value="PICKUP_ONLY" bind:group={selectedService} class="peer sr-only" />
          <div class="p-4 rounded-2xl border-2 border-surface-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all text-center">
            <div class="text-xl mb-1">🏠 ➡️ 🧺</div>
            <div class="font-bold text-surface-900 text-sm">Jemput Saja</div>
          </div>
        </label>
        <label class="cursor-pointer">
          <input type="radio" name="serviceType" value="DELIVERY_ONLY" bind:group={selectedService} class="peer sr-only" />
          <div class="p-4 rounded-2xl border-2 border-surface-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all text-center">
            <div class="text-xl mb-1">🧺 ➡️ 🏠</div>
            <div class="font-bold text-surface-900 text-sm">Antar Saja</div>
          </div>
        </label>
        <label class="cursor-pointer">
          <input type="radio" name="serviceType" value="PICKUP_AND_DELIVERY" bind:group={selectedService} class="peer sr-only" />
          <div class="p-4 rounded-2xl border-2 border-surface-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all text-center">
            <div class="text-xl mb-1">🔄</div>
            <div class="font-bold text-surface-900 text-sm">Antar & Jemput</div>
          </div>
        </label>
      </div>
    </div>

    <div class="mb-8">
      <h3 class="font-bold text-surface-900 mb-4">Pilih Kendaraan</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        {#each vehicles as v}
          <label class="cursor-pointer relative">
            <input type="radio" name="vehicleType" value={v.id} bind:group={selectedVehicle} class="peer sr-only" />
            <div class="p-4 rounded-2xl border-2 border-surface-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 transition-all">
              <div class="text-3xl mb-2">{v.icon}</div>
              <div class="font-bold text-surface-900 text-sm">{v.name}</div>
              <div class="text-xs text-surface-500 mt-1">{v.desc}</div>
              
              {#if selectedVehicle === v.id}
                <div class="absolute top-4 right-4 text-blue-600">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                </div>
              {/if}
            </div>
          </label>
        {/each}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label for="pickupAddress" class="block text-sm font-bold text-surface-900 mb-2">Alamat Penjemputan</label>
        {#if addresses.length > 0}
          <select name="pickupAddress" id="pickupAddress" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
            {#each addresses as addr}
              <option value={addr.fullAddress}>{addr.label}: {addr.fullAddress}</option>
            {/each}
            <option value="Input Manual">Ketik Alamat Lain (Tulis di Catatan)</option>
          </select>
        {:else}
          <textarea name="pickupAddress" id="pickupAddress" rows="2" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Masukkan alamat lengkap..." required></textarea>
        {/if}
      </div>
      
      <div>
        <label for="destinationAddress" class="block text-sm font-bold text-surface-900 mb-2">Alamat Tujuan (Laundry)</label>
        <textarea name="destinationAddress" id="destinationAddress" rows="2" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Masukkan alamat laundry tujuan..." required>Toko Antar Laundry, Jl. Utama No. 1</textarea>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div>
        <label for="estimatedWeight" class="block text-sm font-bold text-surface-900 mb-2">Estimasi Berat Pakaian (KG)</label>
        <input type="number" name="estimatedWeight" id="estimatedWeight" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Contoh: 5" min="1" required />
      </div>
      <div>
        <label for="notes" class="block text-sm font-bold text-surface-900 mb-2">Catatan untuk Kurir (Opsional)</label>
        <input type="text" name="notes" id="notes" class="w-full px-4 py-3 rounded-xl border border-surface-300 focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Pakaian warna putih tolong dipisah" />
      </div>
    </div>

    <!-- Summary -->
    <div class="bg-surface-50 p-6 rounded-2xl border border-surface-200 flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
      <div>
        <p class="text-sm text-surface-500 font-medium mb-1">Estimasi Biaya Pengantaran</p>
        <div class="text-3xl font-black text-surface-900">Rp{currentPrice.toLocaleString('id-ID')}</div>
      </div>
      <button type="submit" class="w-full md:w-auto bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all active:scale-95 text-center">
        Pesan Go Laundry
      </button>
    </div>

  </form>
</div>
