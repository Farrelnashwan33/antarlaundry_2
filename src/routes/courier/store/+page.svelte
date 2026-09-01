<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
  let storeQueue = $derived(data.storeQueue);
</script>

<svelte:head>
  <title>Store - Courier Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full">
  <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-surface-100">
    <div>
      <h1 class="text-2xl font-bold text-surface-900">Store</h1>
      <p class="text-sm text-surface-500">Ambil tugas baru yang tersedia untuk dikerjakan</p>
    </div>
    <div class="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold border border-blue-100">
      {storeQueue.length} Available
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border border-surface-100 p-5 flex flex-col">
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
          {#each storeQueue as delivery}
            <tr class="hover:bg-surface-50/50 transition-colors">
              <td class="px-2 py-4 text-surface-600">
                <div class="font-medium text-surface-900">{delivery.order.customer.name}</div>
                <div class="text-xs text-surface-400">{new Date(delivery.createdAt).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</div>
              </td>
              <td class="px-2 py-4 text-surface-500 truncate max-w-[150px]" title={delivery.type === 'PICKUP' ? delivery.order.pickupAddress?.fullAddress : delivery.order.deliveryAddress?.fullAddress}>
                {delivery.type === 'PICKUP' ? delivery.order.pickupAddress?.fullAddress || '-' : delivery.order.deliveryAddress?.fullAddress || '-'}
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
                  <button type="submit" class="text-xs bg-surface-900 text-white font-medium hover:bg-surface-800 px-3 py-1.5 rounded-md transition-colors shadow-sm">
                    Ambil Tugas &rarr;
                  </button>
                </form>
              </td>
            </tr>
          {/each}
          {#if storeQueue.length === 0}
            <tr>
              <td colspan="4" class="px-2 py-8 text-center text-surface-400">
                <div class="flex flex-col items-center justify-center gap-2">
                  <span class="text-3xl">☕</span>
                  <span class="text-sm">Tidak ada antrean baru.</span>
                </div>
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
