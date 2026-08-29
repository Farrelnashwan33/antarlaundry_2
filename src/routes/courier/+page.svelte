<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
  
  // Deriving data
  let globalQueue = $derived(data.globalQueue);
  let activeDeliveries = $derived(data.activeDeliveries);
  let stats = $derived(data.stats);

  const calcPct = (count: number) => stats.totalTasks > 0 ? Math.round((count / stats.totalTasks) * 100) : 0;
</script>

<svelte:head>
  <title>Dashboard Kurir - High Clean Pro</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full">
  
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <span>Courier</span>
    </div>
    <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Home</h1>
  </div>

  <!-- 4 Minimal Stat Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">All Tasks</div>
      <div class="text-3xl font-bold text-surface-900">{stats.totalTasks}</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">Global Queue</div>
      <div class="text-3xl font-bold text-surface-900">{stats.globalQueueCount}</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">Active Tasks</div>
      <div class="text-3xl font-bold text-surface-900">{stats.activeCount}</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">Finished Tasks</div>
      <div class="text-3xl font-bold text-surface-900">{stats.completedCount}</div>
    </div>
  </div>

  <!-- Tables Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
    <!-- Table 1: Global Queue -->
    <div class="bg-white rounded-xl shadow-sm border border-surface-100 p-5 flex flex-col" id="queue">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-medium text-surface-900">Global Queue</h3>
        <div class="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-md font-medium border border-blue-100">
          {stats.globalQueueCount} Available
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left whitespace-nowrap">
          <thead class="text-[11px] uppercase tracking-wider text-surface-400 border-b border-surface-100">
            <tr>
              <th class="px-2 py-3 font-medium">Customer</th>
              <th class="px-2 py-3 font-medium">Address</th>
              <th class="px-2 py-3 font-medium">Type</th>
              <th class="px-2 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100/60">
            {#each globalQueue as delivery}
              <tr class="hover:bg-surface-50/50 transition-colors">
                <td class="px-2 py-4 text-surface-600">
                  <div class="font-medium text-surface-900">{delivery.order.customer.name}</div>
                  <div class="text-xs text-surface-400">{new Date(delivery.createdAt).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</div>
                </td>
                <td class="px-2 py-4 text-surface-500 truncate max-w-[150px]" title={delivery.type === 'PICKUP' ? delivery.order.pickupAddress?.fullAddress : delivery.order.deliveryAddress?.fullAddress}>
                  {delivery.type === 'PICKUP' ? (delivery.order.pickupAddress?.fullAddress || '-') : (delivery.order.deliveryAddress?.fullAddress || '-')}
                </td>
                <td class="px-2 py-4">
                  {#if delivery.type === 'PICKUP'}
                    <span class="text-amber-600 bg-amber-50 border border-amber-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Pickup</span>
                  {:else}
                    <span class="text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Delivery</span>
                  {/if}
                </td>
                <td class="px-2 py-4 text-right">
                  <form method="POST" action="?/acceptTask" use:enhance>
                    <input type="hidden" name="deliveryId" value={delivery.id} />
                    <button type="submit" class="text-xs bg-surface-900 text-white font-medium hover:bg-surface-700 px-3 py-1.5 rounded-md transition-colors">
                      Ambil &rarr;
                    </button>
                  </form>
                </td>
              </tr>
            {/each}
            {#if globalQueue.length === 0}
              <tr>
                <td colspan="4" class="px-2 py-8 text-center text-surface-400 text-xs">
                  Tidak ada antrean baru.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Table 2: Active Tasks -->
    <div class="bg-white rounded-xl shadow-sm border border-surface-100 p-5 flex flex-col" id="history">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-medium text-surface-900">In Conversation</h3>
        <div class="text-xs bg-amber-50 text-amber-600 px-2.5 py-1 rounded-md font-medium border border-amber-100">
          {stats.activeCount} Active
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left whitespace-nowrap">
          <thead class="text-[11px] uppercase tracking-wider text-surface-400 border-b border-surface-100">
            <tr>
              <th class="px-2 py-3 font-medium">Customer</th>
              <th class="px-2 py-3 font-medium">Status</th>
              <th class="px-2 py-3 font-medium">Type</th>
              <th class="px-2 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100/60">
            {#each activeDeliveries as delivery}
              <tr class="hover:bg-surface-50/50 transition-colors">
                <td class="px-2 py-4 text-surface-600">
                  <div class="font-medium text-surface-900">{delivery.order.customer.name}</div>
                  <div class="text-[11px] text-surface-400">#{delivery.order.orderNumber}</div>
                </td>
                <td class="px-2 py-4 font-medium text-blue-600 text-xs">
                  {delivery.status}
                </td>
                <td class="px-2 py-4">
                  {#if delivery.type === 'PICKUP'}
                    <span class="text-amber-600 bg-amber-50 border border-amber-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Pickup</span>
                  {:else}
                    <span class="text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Delivery</span>
                  {/if}
                </td>
                <td class="px-2 py-4 text-right">
                  <form method="POST" action="?/completeTask" use:enhance>
                    <input type="hidden" name="deliveryId" value={delivery.id} />
                    <input type="hidden" name="orderId" value={delivery.orderId} />
                    <button type="submit" class="text-xs bg-green-500 text-white font-medium hover:bg-green-600 px-3 py-1.5 rounded-md transition-colors shadow-sm">
                      Selesai &rarr;
                    </button>
                  </form>
                </td>
              </tr>
            {/each}
            {#if activeDeliveries.length === 0}
              <tr>
                <td colspan="4" class="px-2 py-8 text-center text-surface-400 text-xs">
                  Anda belum mengambil tugas.
                </td>
              </tr>
            {/if}
          </tbody>
        </table>
      </div>
    </div>
    
  </div>
</div>
