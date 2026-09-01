<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { invalidateAll } from '$app/navigation';

  let { data } = $props();
  let order = $derived(data.order);
  
  let pollingInterval: any;

  onMount(() => {
    // Poll every 5 seconds if order is not completed or cancelled
    if (!['COMPLETED', 'CANCELLED'].includes(order.status)) {
      pollingInterval = setInterval(() => {
        invalidateAll();
      }, 5000);
    }
  });

  onDestroy(() => {
    if (pollingInterval) clearInterval(pollingInterval);
  });
  
  const getStepStatus = (status: string, target: string) => {
    const flow = ['AVAILABLE', 'CLAIMING', 'ASSIGNED', 'HEADING_TO_PICKUP', 'PICKED_UP', 'ON_DELIVERY', 'COMPLETED', 'CANCELLED'];
    const curIdx = flow.indexOf(status);
    const targetIdx = flow.indexOf(target);
    
    if (status === 'CANCELLED') return 'upcoming';
    if (curIdx > targetIdx) return 'completed';
    if (curIdx === targetIdx) return 'current';
    return 'upcoming';
  };
</script>

<svelte:head>
  <title>Lacak Order - GO LAUNDRY</title>
</svelte:head>

<div class="max-w-2xl mx-auto w-full flex flex-col gap-6">
  
  <div class="flex justify-between items-center bg-blue-600 text-white p-6 rounded-3xl shadow-md relative overflow-hidden">
    <div class="absolute -right-5 -top-5 text-7xl opacity-20">🛵</div>
    <div class="relative z-10">
      <div class="text-xs font-bold text-blue-200 uppercase tracking-widest mb-1">Status Order</div>
      <h1 class="text-2xl font-black">{order.status.replace(/_/g, ' ')}</h1>
    </div>
    <div class="relative z-10 text-right">
      <div class="text-xs font-bold text-blue-200 mb-1">Order #</div>
      <div class="font-mono font-bold text-lg">{order.orderNumber}</div>
    </div>
  </div>

  {#if order.courier}
    <div class="bg-white rounded-3xl p-6 border border-surface-200 shadow-sm flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div class="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-md">
          🧑‍✈️
        </div>
        <div>
          <div class="text-xs font-bold text-surface-400 uppercase tracking-widest mb-1">Kurir Anda</div>
          <h3 class="font-bold text-lg text-surface-900">{order.courier.name}</h3>
          <div class="flex items-center gap-2 text-sm text-surface-500 mt-0.5">
            <span class="bg-surface-100 px-2 py-0.5 rounded text-xs font-bold text-surface-700">
              {order.courier.courierProfile?.vehicleType?.replace('_', ' ') || order.vehicleType.replace('_', ' ')}
            </span>
            <span>⭐ 4.9</span>
          </div>
        </div>
      </div>
      <a href="tel:{order.courier.phone}" class="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors">
        📞
      </a>
    </div>
  {:else if order.status === 'AVAILABLE'}
    <div class="bg-blue-50 border border-blue-200 rounded-3xl p-6 flex items-center gap-4 animate-pulse">
      <div class="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center text-xl">⏳</div>
      <div>
        <h3 class="font-bold text-blue-900">Mencari Kurir</h3>
        <p class="text-sm text-blue-700">Order Anda sedang ditawarkan ke kurir di sekitar Anda.</p>
      </div>
    </div>
  {/if}

  <!-- Timeline -->
  <div class="bg-white rounded-3xl p-6 border border-surface-200 shadow-sm">
    <h3 class="font-bold text-surface-900 mb-6">Tracking Perjalanan</h3>
    
    <div class="relative border-l-2 border-surface-100 ml-3 space-y-8">
      
      <!-- AVAILABLE -->
      <div class="relative pl-6">
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
          {getStepStatus(order.status, 'AVAILABLE') === 'completed' ? 'bg-blue-500 border-blue-500' : (getStepStatus(order.status, 'AVAILABLE') === 'current' ? 'bg-white border-blue-500 ring-4 ring-blue-50' : 'bg-white border-surface-300')}"></div>
        <h4 class="font-bold text-sm {getStepStatus(order.status, 'AVAILABLE') !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Order Dibuat</h4>
        <p class="text-xs text-surface-500 mt-1">Mencari kurir terdekat</p>
      </div>

      <!-- ASSIGNED -->
      <div class="relative pl-6">
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
          {getStepStatus(order.status, 'ASSIGNED') === 'completed' ? 'bg-blue-500 border-blue-500' : (getStepStatus(order.status, 'ASSIGNED') === 'current' ? 'bg-white border-blue-500 ring-4 ring-blue-50' : 'bg-white border-surface-300')}"></div>
        <h4 class="font-bold text-sm {getStepStatus(order.status, 'ASSIGNED') !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Kurir Ditemukan</h4>
        <p class="text-xs text-surface-500 mt-1">Kurir menerima pesanan Anda</p>
      </div>

      <!-- HEADING_TO_PICKUP -->
      <div class="relative pl-6">
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
          {getStepStatus(order.status, 'HEADING_TO_PICKUP') === 'completed' ? 'bg-blue-500 border-blue-500' : (getStepStatus(order.status, 'HEADING_TO_PICKUP') === 'current' ? 'bg-white border-blue-500 ring-4 ring-blue-50' : 'bg-white border-surface-300')}"></div>
        <h4 class="font-bold text-sm {getStepStatus(order.status, 'HEADING_TO_PICKUP') !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Menuju Lokasi Pickup</h4>
        <p class="text-xs text-surface-500 mt-1">Kurir sedang menuju alamat Anda</p>
      </div>

      <!-- PICKED_UP -->
      <div class="relative pl-6">
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
          {getStepStatus(order.status, 'PICKED_UP') === 'completed' ? 'bg-blue-500 border-blue-500' : (getStepStatus(order.status, 'PICKED_UP') === 'current' ? 'bg-white border-blue-500 ring-4 ring-blue-50' : 'bg-white border-surface-300')}"></div>
        <h4 class="font-bold text-sm {getStepStatus(order.status, 'PICKED_UP') !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Laundry Diambil</h4>
        <p class="text-xs text-surface-500 mt-1">Laundry sudah berada di tangan kurir</p>
      </div>
      
      <!-- ON_DELIVERY -->
      <div class="relative pl-6">
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
          {getStepStatus(order.status, 'ON_DELIVERY') === 'completed' ? 'bg-blue-500 border-blue-500' : (getStepStatus(order.status, 'ON_DELIVERY') === 'current' ? 'bg-white border-blue-500 ring-4 ring-blue-50' : 'bg-white border-surface-300')}"></div>
        <h4 class="font-bold text-sm {getStepStatus(order.status, 'ON_DELIVERY') !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Dalam Perjalanan</h4>
        <p class="text-xs text-surface-500 mt-1">Kurir menuju tujuan pengantaran</p>
      </div>

      <!-- COMPLETED -->
      <div class="relative pl-6">
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
          {getStepStatus(order.status, 'COMPLETED') === 'completed' ? 'bg-green-500 border-green-500' : (getStepStatus(order.status, 'COMPLETED') === 'current' ? 'bg-green-500 border-green-500 ring-4 ring-green-50' : 'bg-white border-surface-300')}"></div>
        <h4 class="font-bold text-sm {getStepStatus(order.status, 'COMPLETED') !== 'upcoming' ? 'text-green-600' : 'text-surface-400'}">Selesai</h4>
        <p class="text-xs text-surface-500 mt-1">Order Go Laundry telah selesai</p>
      </div>

    </div>
  </div>
  
  <div class="flex justify-center mt-4">
    <a href="/dashboard" class="text-surface-500 font-bold text-sm hover:text-surface-800 transition-colors">
      &larr; Kembali ke Dashboard
    </a>
  </div>
</div>
