<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { invalidateAll } from '$app/navigation';

  let { data } = $props();
  let couriers = $derived(data.couriers);
  let stats = $derived(data.stats);

  let pollingInterval: any;
  onMount(() => {
    pollingInterval = setInterval(() => { invalidateAll(); }, 5000);
  });
  onDestroy(() => {
    if (pollingInterval) clearInterval(pollingInterval);
  });
</script>

<svelte:head>
  <title>Admin - Go Laundry Couriers</title>
</svelte:head>

<div class="flex items-center justify-between mb-8">
  <div>
    <h1 class="text-2xl font-bold text-surface-900">Go Laundry Couriers</h1>
    <p class="text-surface-500 text-sm">Monitor status kurir aktif untuk layanan antar-jemput cepat</p>
  </div>
  <a href="/admin/golaundry/orders" class="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-lg text-sm border border-blue-100 hover:bg-blue-100 transition-colors">
    Monitor Orders &rarr;
  </a>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
  <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm">
    <div class="text-surface-500 text-xs font-bold uppercase tracking-wider mb-1">Total Kurir</div>
    <div class="text-3xl font-black text-surface-900">{stats.total}</div>
  </div>
  <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm border-l-4 border-l-green-500">
    <div class="text-surface-500 text-xs font-bold uppercase tracking-wider mb-1">Online (Aktif)</div>
    <div class="text-3xl font-black text-green-600">{stats.online}</div>
  </div>
  <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm border-l-4 border-l-surface-300">
    <div class="text-surface-500 text-xs font-bold uppercase tracking-wider mb-1">Offline</div>
    <div class="text-3xl font-black text-surface-400">{stats.offline}</div>
  </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {#each couriers as courier}
    <div class="bg-white rounded-3xl p-6 border border-surface-200 shadow-sm relative overflow-hidden group">
      <!-- Status Indicator -->
      <div class="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5
        {courier.isOnline ? 'bg-green-100 text-green-700' : 'bg-surface-100 text-surface-500'}">
        <span class="w-1.5 h-1.5 rounded-full {courier.isOnline ? 'bg-green-500 animate-pulse' : 'bg-surface-400'}"></span>
        {courier.isOnline ? 'ONLINE' : 'OFFLINE'}
      </div>

      <div class="flex items-center gap-4 mb-6 mt-2">
        <div class="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold border border-blue-100">
          {courier.name.charAt(0)}
        </div>
        <div>
          <h3 class="font-bold text-surface-900 text-lg">{courier.name}</h3>
          <p class="text-sm text-surface-500">{courier.phone}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="bg-surface-50 p-3 rounded-xl border border-surface-100">
          <div class="text-[10px] text-surface-500 uppercase tracking-wider font-bold mb-1">Kendaraan</div>
          <div class="text-sm font-medium text-surface-900 flex items-center gap-1">
            {courier.vehicleType === 'MOTOR' ? '🛵' : courier.vehicleType === 'MOTOR_BOX' ? '🛺' : '🚗'} 
            {courier.vehicleType.replace('_', ' ')}
          </div>
        </div>
        <div class="bg-surface-50 p-3 rounded-xl border border-surface-100">
          <div class="text-[10px] text-surface-500 uppercase tracking-wider font-bold mb-1">Plat Nomor</div>
          <div class="text-sm font-medium text-surface-900">{courier.licensePlate}</div>
        </div>
      </div>
      
      <div class="flex justify-between items-center pt-4 border-t border-surface-100">
        <span class="text-xs text-surface-500 font-medium">Order Diselesaikan</span>
        <span class="text-sm font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">{courier.completedOrders} Order</span>
      </div>
    </div>
  {/each}
</div>

{#if couriers.length === 0}
  <div class="bg-white rounded-3xl p-12 text-center shadow-sm border border-surface-100">
    <div class="text-5xl mb-4 opacity-50">👥</div>
    <h3 class="text-lg font-bold text-surface-900 mb-2">Belum ada kurir</h3>
    <p class="text-surface-500 text-sm">Tidak ada user dengan role COURIER yang ditemukan.</p>
  </div>
{/if}
