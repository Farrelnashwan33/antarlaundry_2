<script lang="ts">
  import { enhance } from '$app/forms';

  let { data, form } = $props();
  let address = $derived(data.address);
</script>

<svelte:head>
  <title>Edit Alamat - Antar Laundry</title>
</svelte:head>

<div class="max-w-2xl mx-auto p-6 lg:p-10">
  <div class="mb-8">
    <a href="/dashboard/address" class="inline-flex items-center text-surface-500 hover:text-primary-600 transition-colors mb-4 font-medium">
      <span class="mr-2">←</span> Kembali ke Alamat Saya
    </a>
    <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Edit Alamat</h1>
    <p class="text-surface-500 mt-1">Perbarui detail alamat Anda</p>
  </div>

  {#if form?.error}
    <div class="bg-error-50 text-error-600 p-4 rounded-xl mb-6 border border-error-100 flex items-start gap-3">
      <span class="text-xl">⚠️</span>
      <p class="font-medium mt-0.5">{form.error}</p>
    </div>
  {/if}

  <form method="POST" use:enhance class="bg-white border border-surface-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6">
    <div>
      <label for="label" class="block text-sm font-bold text-surface-900 mb-2">Label Alamat <span class="text-error-500">*</span></label>
      <input 
        type="text" 
        id="label" 
        name="label" 
        value={address.label}
        placeholder="Contoh: Rumah, Kantor, Kost" 
        required
        class="w-full bg-surface-50 border border-surface-200 text-surface-900 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3.5 transition-colors"
      />
    </div>

    <div>
      <label for="fullAddress" class="block text-sm font-bold text-surface-900 mb-2">Alamat Lengkap <span class="text-error-500">*</span></label>
      <textarea 
        id="fullAddress" 
        name="fullAddress" 
        rows="3" 
        value={address.fullAddress}
        placeholder="Nama jalan, gedung, nomor rumah, RT/RW, dll." 
        required
        class="w-full bg-surface-50 border border-surface-200 text-surface-900 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3.5 transition-colors resize-none"
      ></textarea>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="city" class="block text-sm font-bold text-surface-900 mb-2">Kota / Kabupaten <span class="text-error-500">*</span></label>
        <input 
          type="text" 
          id="city" 
          name="city" 
          value={address.city}
          required
          class="w-full bg-surface-50 border border-surface-200 text-surface-900 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3.5 transition-colors"
        />
      </div>

      <div>
        <label for="postalCode" class="block text-sm font-bold text-surface-900 mb-2">Kode Pos <span class="text-surface-400 font-normal">(Opsional)</span></label>
        <input 
          type="text" 
          id="postalCode" 
          name="postalCode" 
          value={address.postalCode ?? ''}
          class="w-full bg-surface-50 border border-surface-200 text-surface-900 text-sm rounded-xl focus:ring-primary-500 focus:border-primary-500 block p-3.5 transition-colors"
        />
      </div>
    </div>

    <div class="pt-4 flex gap-4">
      <a href="/dashboard/address" class="w-full text-center py-3.5 px-4 border border-surface-300 text-surface-700 rounded-xl font-bold hover:bg-surface-50 transition-colors">
        Batal
      </a>
      <button type="submit" class="w-full text-center py-3.5 px-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-colors shadow-sm">
        Simpan Perubahan
      </button>
    </div>
  </form>
</div>
