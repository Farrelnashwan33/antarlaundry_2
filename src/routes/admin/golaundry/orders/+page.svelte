<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { invalidateAll } from '$app/navigation';

  let { data } = $props();
  let orders = $derived(data.orders);
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
  <title>Admin - Go Laundry Orders</title>
</svelte:head>

<div class="flex items-center justify-between mb-8">
  <div>
    <h1 class="text-2xl font-bold text-surface-900">Go Laundry Orders</h1>
    <p class="text-surface-500 text-sm">Monitor semua pesanan antar-jemput cepat</p>
  </div>
  <a href="/admin/golaundry/couriers" class="bg-blue-50 text-blue-600 font-bold px-4 py-2 rounded-lg text-sm border border-blue-100 hover:bg-blue-100 transition-colors">
    Monitor Kurir &rarr;
  </a>
</div>

<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
  <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm">
    <div class="text-surface-500 text-xs font-bold uppercase tracking-wider mb-1">Total Order</div>
    <div class="text-3xl font-black text-surface-900">{stats.total}</div>
  </div>
  <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm border-l-4 border-l-blue-500">
    <div class="text-surface-500 text-xs font-bold uppercase tracking-wider mb-1">Menunggu Kurir</div>
    <div class="text-3xl font-black text-blue-600">{stats.waiting}</div>
  </div>
  <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm border-l-4 border-l-amber-500">
    <div class="text-surface-500 text-xs font-bold uppercase tracking-wider mb-1">Dalam Perjalanan</div>
    <div class="text-3xl font-black text-amber-600">{stats.onDelivery}</div>
  </div>
  <div class="bg-white p-5 rounded-2xl border border-surface-200 shadow-sm border-l-4 border-l-green-500">
    <div class="text-surface-500 text-xs font-bold uppercase tracking-wider mb-1">Selesai</div>
    <div class="text-3xl font-black text-green-600">{stats.completed}</div>
  </div>
</div>

<div class="bg-white border border-surface-200 rounded-2xl shadow-sm overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full text-left text-sm whitespace-nowrap">
      <thead class="bg-surface-50 border-b border-surface-200 text-surface-600 font-medium">
        <tr>
          <th class="px-6 py-4">Order ID</th>
          <th class="px-6 py-4">Status</th>
          <th class="px-6 py-4">Layanan</th>
          <th class="px-6 py-4">Customer</th>
          <th class="px-6 py-4">Kurir</th>
          <th class="px-6 py-4">Biaya Total</th>
          <th class="px-6 py-4">Waktu</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-surface-100">
        {#each orders as order}
          <tr class="hover:bg-surface-50/50 transition-colors">
            <td class="px-6 py-4">
              <div class="font-mono font-bold text-surface-900">{order.orderNumber}</div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider 
                {order.status === 'AVAILABLE' ? 'bg-blue-100 text-blue-700' : 
                 order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                 order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}">
                {order.status.replace(/_/g, ' ')}
              </span>
            </td>
            <td class="px-6 py-4">
              <div class="text-surface-900 font-medium">{order.serviceType.replace(/_/g, ' ')}</div>
              <div class="text-[11px] text-surface-500">{order.vehicleType.replace(/_/g, ' ')} • ±{order.estimatedWeight} kg</div>
            </td>
            <td class="px-6 py-4 text-surface-600">{order.customer?.name || '-'}</td>
            <td class="px-6 py-4 text-surface-600">{order.courier?.name || '-'}</td>
            <td class="px-6 py-4 text-surface-900 font-medium">Rp{order.deliveryFee.toLocaleString('id-ID')}</td>
            <td class="px-6 py-4 text-surface-500">
              {new Date(order.createdAt).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute:'2-digit' })}
            </td>
          </tr>
        {/each}
        {#if orders.length === 0}
          <tr>
            <td colspan="7" class="px-6 py-12 text-center text-surface-500">Belum ada order Go Laundry</td>
          </tr>
        {/if}
      </tbody>
    </table>
  </div>
</div>
