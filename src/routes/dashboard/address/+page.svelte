<script lang="ts">
  import type { PageData } from './$types';
  import { enhance } from '$app/forms';

  let { data } = $props();
  let addresses = $derived(data.addresses);
</script>

<svelte:head>
  <title>Alamat Saya - Antar Laundry</title>
</svelte:head>

<div class="p-6 lg:p-10">
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Alamat Saya</h1>
      <p class="text-surface-500 mt-1">Kelola alamat penjemputan dan pengantaran</p>
    </div>
    <a href="/dashboard/address/new" class="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm flex items-center gap-2">
      <span class="text-xl">+</span>
      <span>Tambah Alamat</span>
    </a>
  </div>
  
  {#if addresses.length === 0}
    <div class="bg-white border border-surface-200 rounded-3xl p-10 text-center shadow-sm">
      <div class="text-6xl mb-4 opacity-50">📍</div>
      <h3 class="text-xl font-bold text-surface-900 mb-2">Belum ada alamat</h3>
      <p class="text-surface-500 mb-6">Anda belum menambahkan alamat untuk penjemputan atau pengantaran.</p>
      <a href="/dashboard/address/new" class="inline-flex bg-primary-50 text-primary-600 font-semibold px-6 py-3 rounded-xl hover:bg-primary-100 transition-colors">
        Tambah Alamat Sekarang
      </a>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each addresses as address}
        <div class="bg-white border border-surface-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div class="flex justify-between items-start mb-4">
            <span class="inline-block bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {address.label}
            </span>
          </div>
          
          <p class="text-surface-800 font-medium leading-relaxed flex-grow">
            {address.fullAddress}
          </p>
          
          <div class="mt-4 pt-4 border-t border-surface-100 text-sm text-surface-500">
            {address.city} {address.postalCode ? `- ${address.postalCode}` : ''}
          </div>
          
          <div class="mt-6 flex justify-end gap-3">
            <a href={`/dashboard/address/edit/${address.id}`} class="text-surface-500 hover:text-primary-600 font-medium text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-50">
              Edit
            </a>
            <form method="POST" action="?/delete" use:enhance={() => {
              return async ({ result, update }) => {
                if (result.type === 'success') {
                  update();
                }
              };
            }}>
              <input type="hidden" name="id" value={address.id} />
              <button type="submit" class="text-error-500 hover:text-error-600 font-medium text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-error-50" onclick={(e) => { if (!confirm('Apakah Anda yakin ingin menghapus alamat ini?')) e.preventDefault(); }}>
                Hapus
              </button>
            </form>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>
