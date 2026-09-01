<script lang="ts">
  import { enhance } from '$app/forms';

  let { data } = $props();
  let availableOrders = $derived(data.availableOrders);
  let profile = $derived(data.profile);
</script>

<svelte:head>
  <title>Order Tersedia - GO LAUNDRY</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full max-w-4xl mx-auto">
  <!-- Header -->
  <div class="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-surface-100">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-xl">🛵</div>
      <div>
        <h1 class="font-bold text-surface-900 leading-tight">Order Tersedia</h1>
        <p class="text-xs text-surface-500">Ambil order Go Laundry di sekitar Anda</p>
      </div>
    </div>
    <a href="/courier" class="text-xs font-bold text-surface-500 hover:text-surface-700 bg-surface-50 px-3 py-1.5 rounded-lg border border-surface-200">
      Kembali
    </a>
  </div>

  {#if !profile?.isOnline}
    <div class="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm flex gap-3">
      <div>⚠️</div>
      <div>
        <span class="font-bold">Anda sedang offline.</span> 
        Sebaiknya ubah status Anda menjadi online di dashboard agar mendapatkan prioritas order yang lebih baik.
      </div>
    </div>
  {/if}

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    {#each availableOrders as order}
      <div class="bg-white rounded-2xl p-5 shadow-sm border border-surface-200 flex flex-col hover:border-blue-300 transition-colors relative overflow-hidden group">
        <!-- Accent bar -->
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-2xl"></div>
        
        <div class="flex justify-between items-start mb-4">
          <div>
            <span class="text-xs font-mono font-bold text-surface-400">{order.orderNumber}</span>
            <div class="flex gap-2 mt-1">
              <span class="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md border border-blue-100 uppercase">
                {order.serviceType.replace(/_/g, ' ')}
              </span>
              <span class="text-[10px] font-bold bg-slate-50 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200 uppercase flex items-center gap-1">
                {order.vehicleType === 'MOTOR' ? '🛵' : order.vehicleType === 'MOTOR_BOX' ? '🛺' : '🚗'} {order.vehicleType.replace('_', ' ')}
              </span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-[10px] text-surface-500 block mb-0.5">Penghasilan</span>
            <span class="text-lg font-black text-green-600">Rp{order.courierEarning.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div class="flex flex-col gap-3 mb-5">
          <div class="flex items-start gap-3">
            <div class="w-5 flex justify-center text-surface-300 mt-0.5">📍</div>
            <div>
              <div class="text-[10px] text-surface-500 font-bold uppercase tracking-wider mb-0.5">Pickup</div>
              <div class="text-sm font-medium text-surface-900 leading-snug">{order.pickupAddress}</div>
            </div>
          </div>
          <div class="flex items-start gap-3">
            <div class="w-5 flex justify-center text-blue-500 mt-0.5">🏁</div>
            <div>
              <div class="text-[10px] text-surface-500 font-bold uppercase tracking-wider mb-0.5">Tujuan</div>
              <div class="text-sm font-medium text-surface-900 leading-snug">{order.destinationAddress}</div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-auto pt-4 border-t border-surface-100">
          <div class="flex items-center gap-2 text-xs text-surface-500 font-medium">
            <span>👕 ± {order.estimatedWeight || 0} KG</span>
          </div>
          
          <form method="POST" action="?/claimOrder" use:enhance>
            <input type="hidden" name="orderId" value={order.id} />
            <button type="submit" class="bg-blue-600 text-white font-bold text-sm px-6 py-2 rounded-xl hover:bg-blue-700 hover:shadow-md transition-all active:scale-95 shadow-sm shadow-blue-500/20">
              AMBIL ORDER
            </button>
          </form>
        </div>
      </div>
    {/each}
  </div>
  
  {#if availableOrders.length === 0}
    <div class="bg-white rounded-3xl p-12 text-center shadow-sm border border-surface-100 flex flex-col items-center justify-center">
      <div class="text-6xl mb-4 opacity-50">☕</div>
      <h3 class="text-lg font-bold text-surface-900 mb-2">Belum ada order</h3>
      <p class="text-surface-500 text-sm max-w-sm">Order baru akan muncul di sini. Silakan istirahat sejenak sambil menunggu order Go Laundry berikutnya.</p>
      
      <button onclick={() => window.location.reload()} class="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
        Muat Ulang
      </button>
    </div>
  {/if}
</div>
