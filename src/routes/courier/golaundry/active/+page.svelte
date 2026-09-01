<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
  let activeOrders = $derived(data.activeOrders);
</script>

<svelte:head>
  <title>Order Aktif - GO LAUNDRY</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full max-w-2xl mx-auto">
  <!-- Header -->
  <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-surface-100">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">🚚</div>
      <div>
        <h1 class="font-bold text-surface-900 leading-tight">Order Aktif Anda</h1>
        <p class="text-xs text-surface-500">Selesaikan order tepat waktu</p>
      </div>
    </div>
    <a href="/courier" class="text-xs font-bold text-surface-500 hover:text-surface-700 bg-surface-50 px-3 py-1.5 rounded-lg border border-surface-200">
      Kembali
    </a>
  </div>

  {#if activeOrders.length === 0}
    <div class="bg-white rounded-3xl p-12 text-center shadow-sm border border-surface-100 flex flex-col items-center justify-center">
      <div class="text-6xl mb-4 opacity-50">✨</div>
      <h3 class="text-lg font-bold text-surface-900 mb-2">Belum ada order yang berjalan</h3>
      <p class="text-surface-500 text-sm max-w-sm mb-6">Ambil order baru melalui halaman pool order.</p>
      
      <a href="/courier/golaundry/pool" class="text-sm font-bold text-white bg-blue-600 px-6 py-2.5 rounded-xl shadow-sm hover:bg-blue-700 transition-colors">
        Cari Order
      </a>
    </div>
  {:else}
    <div class="flex flex-col gap-4">
      {#each activeOrders as order}
        <div class="bg-white border border-surface-200 rounded-3xl p-6 shadow-sm">
          
          <div class="flex justify-between items-center mb-6">
            <div>
              <span class="text-xs font-bold font-mono text-surface-400 block mb-1">ORDER {order.orderNumber}</span>
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold tracking-wide">
                <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                {order.status.replace(/_/g, ' ')}
              </div>
            </div>
            <div class="text-right">
              <span class="text-[10px] font-bold text-surface-400 uppercase tracking-widest block mb-1">Penghasilan</span>
              <span class="text-xl font-black text-green-600">Rp{order.courierEarning.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div class="relative border-l-2 border-surface-100 ml-3 space-y-6 mb-8 mt-2">
            
            <div class="relative pl-6">
              <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-green-500 border-green-500 ring-4 ring-green-50"></div>
              <h4 class="font-bold text-sm text-surface-900">Order Diterima</h4>
              <p class="text-[11px] text-surface-500 mt-0.5">Anda menyetujui untuk mengambil order ini</p>
            </div>

            <!-- MENUJU PICKUP -->
            <div class="relative pl-6">
              <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
                {order.status !== 'ASSIGNED' ? 'bg-green-500 border-green-500' : 'bg-white border-surface-300'}"></div>
              <h4 class="font-bold text-sm {order.status !== 'ASSIGNED' ? 'text-surface-900' : 'text-surface-400'}">Menuju Lokasi Pickup</h4>
              {#if order.status === 'ASSIGNED'}
                <form method="POST" action="?/updateStatus" use:enhance class="mt-2">
                  <input type="hidden" name="orderId" value={order.id} />
                  <input type="hidden" name="status" value="HEADING_TO_PICKUP" />
                  <button type="submit" class="bg-surface-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-surface-800 transition-colors">
                    Saya Sudah Jalan &rarr;
                  </button>
                </form>
              {/if}
            </div>

            <!-- SUDAH DIAMBIL -->
            <div class="relative pl-6">
              <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
                {['PICKED_UP', 'ON_DELIVERY'].includes(order.status) ? 'bg-green-500 border-green-500' : 'bg-white border-surface-300'}"></div>
              <h4 class="font-bold text-sm {['PICKED_UP', 'ON_DELIVERY'].includes(order.status) ? 'text-surface-900' : 'text-surface-400'}">Laundry Diambil</h4>
              <div class="text-[11px] text-surface-500 mt-1 font-medium bg-surface-50 p-2 rounded border border-surface-100">
                <span class="block text-surface-400 mb-0.5 uppercase tracking-wider">Lokasi Pickup</span>
                <span class="text-surface-900">{order.pickupAddress}</span>
              </div>
              {#if order.status === 'HEADING_TO_PICKUP'}
                <form method="POST" action="?/updateStatus" use:enhance class="mt-3">
                  <input type="hidden" name="orderId" value={order.id} />
                  <input type="hidden" name="status" value="PICKED_UP" />
                  <button type="submit" class="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                    Laundry Sudah Saya Ambil &rarr;
                  </button>
                </form>
              {/if}
            </div>

            <!-- MULAI PENGANTARAN -->
            <div class="relative pl-6">
              <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 
                {order.status === 'ON_DELIVERY' ? 'bg-green-500 border-green-500' : 'bg-white border-surface-300'}"></div>
              <h4 class="font-bold text-sm {order.status === 'ON_DELIVERY' ? 'text-surface-900' : 'text-surface-400'}">Dalam Perjalanan</h4>
              <div class="text-[11px] text-surface-500 mt-1 font-medium bg-blue-50/50 p-2 rounded border border-blue-100">
                <span class="block text-blue-400 mb-0.5 uppercase tracking-wider">Lokasi Tujuan</span>
                <span class="text-blue-900">{order.destinationAddress}</span>
              </div>
              {#if order.status === 'PICKED_UP'}
                <form method="POST" action="?/updateStatus" use:enhance class="mt-3">
                  <input type="hidden" name="orderId" value={order.id} />
                  <input type="hidden" name="status" value="ON_DELIVERY" />
                  <button type="submit" class="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition-colors">
                    Mulai Mengantar &rarr;
                  </button>
                </form>
              {/if}
            </div>
            
            <!-- SELESAIKAN -->
            {#if order.status === 'ON_DELIVERY'}
              <div class="relative pl-6 mt-6 pt-4 border-t border-surface-100">
                <form method="POST" action="?/updateStatus" use:enhance class="w-full">
                  <input type="hidden" name="orderId" value={order.id} />
                  <input type="hidden" name="status" value="COMPLETED" />
                  <button type="submit" class="w-full bg-green-600 text-white text-sm font-bold px-4 py-3 rounded-xl hover:bg-green-700 shadow-sm shadow-green-500/30 transition-all active:scale-[0.98]">
                    Selesaikan Order
                  </button>
                </form>
              </div>
            {/if}

          </div>

        </div>
      {/each}
    </div>
  {/if}
</div>
