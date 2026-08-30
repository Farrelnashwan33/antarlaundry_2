<script lang="ts">
  import { page } from '$app/stores';
  
  let { data } = $props();
  // We use data.user and data.profile from layout.server.ts via $page.data or data
  let profile = $derived($page.data.profile);
  let activeOrders = $derived(data.activeOrders);
  let currentOrder = $derived(activeOrders?.[0] || null);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const menuCepat = [
    { title: 'Buat Pesanan', desc: 'Buat laundry baru', icon: 'M12 4v16m8-8H4', bg: 'bg-blue-50', text: 'text-blue-600', link: '/dashboard/order/new' },
    { title: 'Pesanan Saya', desc: 'Lihat semua pesanan', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4', bg: 'bg-green-50', text: 'text-green-600', link: '/dashboard/orders' },
    { title: 'Promo & Voucher', desc: 'Dapatkan diskon', icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z', bg: 'bg-orange-50', text: 'text-orange-500', link: '/dashboard/promo' },
    { title: 'Bantuan', desc: 'Pusat bantuan', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z', bg: 'bg-purple-50', text: 'text-purple-600', link: '/dashboard/support' },
  ];

  const getStepStatus = (order: any, step: string) => {
    if (!order) return 'upcoming';
    const s = order.orderStatus;
    const flow = ['PENDING', 'PICKUP', 'PROCESSING', 'WASHING', 'DRYING', 'IRONING', 'READY', 'DELIVERY', 'COMPLETED'];
    
    // Map our DB statuses to timeline steps
    let currentStepIdx = 0;
    if (['PICKUP', 'PROCESSING', 'WASHING', 'DRYING', 'IRONING'].includes(s)) currentStepIdx = 1;
    if (s === 'READY') currentStepIdx = 2;
    if (s === 'DELIVERY') currentStepIdx = 3;
    if (s === 'COMPLETED') currentStepIdx = 4;

    let targetIdx = 0;
    if (step === 'Pesanan Dibuat') targetIdx = 0;
    if (step === 'Dalam Proses') targetIdx = 1;
    if (step === 'Laundry Selesai') targetIdx = 2;
    if (step === 'Siap Diantar') targetIdx = 3;
    if (step === 'Selesai') targetIdx = 4;

    if (currentStepIdx > targetIdx) return 'completed';
    if (currentStepIdx === targetIdx) return 'current';
    return 'upcoming';
  };
</script>

<svelte:head>
  <title>Dashboard - Antar Laundry</title>
</svelte:head>

  <!-- Timeline Snippet -->
  {#snippet timeline()}
    <div>
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-bold text-surface-900">Status Pesanan Aktif</h3>
        {#if currentOrder}
          <span class="text-xs font-mono text-surface-400">#{currentOrder.orderNumber.split('-')[1]}</span>
        {/if}
      </div>

      {#if !currentOrder}
        <div class="text-center py-6 text-surface-400 text-sm">
          Tidak ada pesanan aktif.
        </div>
      {:else}
        {@const step1 = getStepStatus(currentOrder, 'Pesanan Dibuat')}
        {@const step2 = getStepStatus(currentOrder, 'Dalam Proses')}
        {@const step3 = getStepStatus(currentOrder, 'Laundry Selesai')}
        {@const step4 = getStepStatus(currentOrder, 'Siap Diantar')}
        {@const step5 = getStepStatus(currentOrder, 'Selesai')}
        <div class="relative border-l-2 border-surface-200 ml-3 space-y-8 mt-4">
          
          <!-- Step 1 -->
          <div class="relative pl-6">
            <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 {step1 === 'completed' ? 'bg-green-500 border-green-500' : (step1 === 'current' ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-100' : 'bg-white border-surface-300')}"></div>
            <h4 class="font-bold text-sm {step1 !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Pesanan Dibuat</h4>
            <p class="text-xs text-surface-500 mt-1">{new Date(currentOrder.createdAt).toLocaleDateString('id-ID')} {new Date(currentOrder.createdAt).toLocaleTimeString('id-ID', {hour: '2-digit', minute:'2-digit'})}</p>
          </div>

          <!-- Step 2 -->
          <div class="relative pl-6">
            <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 {step2 === 'completed' ? 'bg-green-500 border-green-500' : (step2 === 'current' ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-100' : 'bg-white border-surface-300')}"></div>
            <h4 class="font-bold text-sm {step2 !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Dalam Proses</h4>
            {#if step2 !== 'upcoming'}
               <p class="text-xs text-surface-500 mt-1">Sedang dikerjakan oleh tim kami</p>
            {/if}
          </div>

          <!-- Step 3 -->
          <div class="relative pl-6">
            <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 {step3 === 'completed' ? 'bg-green-500 border-green-500' : (step3 === 'current' ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-100' : 'bg-white border-surface-300')}"></div>
            <h4 class="font-bold text-sm {step3 !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Laundry Selesai</h4>
            <p class="text-xs text-surface-500 mt-1">{step3 !== 'upcoming' ? 'Pakaian sudah bersih & rapi' : 'Menunggu antrian'}</p>
          </div>

          <!-- Step 4 -->
          <div class="relative pl-6">
            <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 {step4 === 'completed' ? 'bg-green-500 border-green-500' : (step4 === 'current' ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-100' : 'bg-white border-surface-300')}"></div>
            <h4 class="font-bold text-sm {step4 !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Siap Diantar</h4>
            <p class="text-xs text-surface-500 mt-1">Menunggu kurir penjemputan</p>
          </div>

          <!-- Step 5 -->
          <div class="relative pl-6">
            <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 {step5 === 'completed' ? 'bg-green-500 border-green-500' : (step5 === 'current' ? 'bg-blue-500 border-blue-500 ring-4 ring-blue-100' : 'bg-white border-surface-300')}"></div>
            <h4 class="font-bold text-sm {step5 !== 'upcoming' ? 'text-surface-900' : 'text-surface-400'}">Selesai</h4>
            <p class="text-xs text-surface-500 mt-1">Pesanan diterima</p>
          </div>
        </div>

        <!-- Estimate Info -->
        <div class="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
          <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-600 shadow-sm shrink-0">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <span class="text-xs text-surface-500 block mb-0.5">Estimasi Selesai</span>
            <span class="text-sm font-bold text-blue-700">Hari ini, 17:00 - 18:00</span>
          </div>
        </div>
      {/if}
    </div>
  {/snippet}

<div class="flex flex-col lg:flex-row min-h-full">
  
  <!-- Main Content Column -->
  <div class="flex-1 p-6 lg:p-10 border-r border-surface-200">
    
    <!-- Header -->
    <div class="flex justify-between items-center mb-10">
      <div>
        <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Dashboard</h1>
        <p class="text-surface-500 mt-1">Selamat datang kembali, <span class="font-bold text-blue-600">{profile?.name}</span>! 👋</p>
      </div>
      <div class="flex items-center gap-4">
        <button class="relative p-2 text-surface-400 hover:text-surface-600 transition-colors bg-white rounded-full border border-surface-200 shadow-sm" aria-label="Notifications">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          <span class="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="bg-white border border-surface-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <span class="text-sm font-semibold text-surface-500">Pesanan Aktif</span>
          </div>
          <div class="text-4xl font-black text-blue-600 mb-2">{activeOrders?.length || 0}</div>
          <a href="/dashboard/orders" class="text-xs font-bold text-blue-600 hover:underline">Lihat detail &rarr;</a>
        </div>
      </div>

      <div class="bg-white border border-surface-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <span class="text-sm font-semibold text-surface-500">Total Transaksi</span>
          </div>
          <div class="text-3xl font-black text-surface-900 mb-2 truncate max-w-[140px]" title={formatCurrency(data.totalSpent || 0)}>{formatCurrency(data.totalSpent || 0)}</div>
          <a href="/dashboard/history" class="text-xs font-bold text-green-600 hover:underline">Lihat riwayat &rarr;</a>
        </div>
      </div>

      <div class="bg-white border border-surface-200 rounded-3xl p-6 shadow-sm flex items-center justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <span class="text-sm font-semibold text-surface-500">Status Akun</span>
          </div>
          <div class="flex items-center gap-2 mb-2">
            <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-2xl font-black text-green-600">Aktif</span>
          </div>
          <span class="text-xs font-medium text-surface-400">Akun terverifikasi</span>
        </div>
      </div>
    </div>

    <!-- Active Orders Box -->
    <div class="mb-10">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold text-surface-900">Pesanan Anda</h2>
        <a href="/dashboard/orders" class="text-sm font-bold text-blue-600 hover:underline">Lihat Semua &rarr;</a>
      </div>
      
      <div class="bg-white border border-surface-200 rounded-3xl p-6 shadow-sm">
        {#if activeOrders?.length === 0}
          <div class="text-center py-8">
            <div class="text-5xl mb-4 opacity-50">👕</div>
            <h3 class="font-bold text-surface-900 mb-2">Belum ada pesanan aktif</h3>
            <p class="text-surface-500 text-sm mb-6">Cucian kotor menumpuk? Biar kami yang urus!</p>
            <a href="/dashboard/order/new" class="inline-block bg-blue-600 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">Buat Pesanan Sekarang</a>
          </div>
        {:else}
          {#each activeOrders as order}
            <div class="flex items-center justify-between p-4 border border-surface-100 rounded-2xl bg-surface-50 hover:bg-white hover:border-surface-200 transition-colors mb-4 last:mb-0">
              <div class="flex items-center gap-5">
                <div class="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>
                </div>
                <div>
                  <div class="flex items-center gap-3 mb-1">
                    <span class="text-xs font-mono text-surface-400">#{order.orderNumber.split('-')[1]}</span>
                    <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">{order.orderStatus}</span>
                  </div>
                  <h3 class="font-bold text-lg text-surface-900">{order.items[0]?.service?.name || 'Laundry Kiloan'}</h3>
                  <p class="text-sm text-surface-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString('id-ID')} &bull; {order.items[0]?.weight || 0} Kg &bull; Reguler
                  </p>
                </div>
              </div>
              <div class="text-right flex flex-col items-end gap-2">
                <span class="text-xl font-extrabold text-blue-600">{formatCurrency(order.total || order.subtotal || 0)}</span>
                <a href="/dashboard/orders" class="px-4 py-1.5 rounded-lg border border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-50 transition-colors">Lihat Detail</a>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    </div>

    <!-- Mobile-only Timeline -->
    <div class="block lg:hidden mb-10 bg-white border border-surface-200 rounded-3xl p-6 shadow-sm">
      {@render timeline()}
    </div>

    <!-- Quick Menu -->
    <div class="mb-10">
      <h2 class="text-xl font-bold text-surface-900 mb-6">Menu Cepat</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        {#each menuCepat as menu}
          <a href={menu.link} class="bg-white border border-surface-200 rounded-3xl p-5 hover:-translate-y-1 hover:shadow-md transition-all flex flex-col items-center text-center group">
            <div class={`w-12 h-12 rounded-2xl ${menu.bg} ${menu.text} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={menu.icon}></path></svg>
            </div>
            <h4 class="font-bold text-sm text-surface-900">{menu.title}</h4>
            <p class="text-[10px] text-surface-500 mt-1">{menu.desc}</p>
          </a>
        {/each}
      </div>
    </div>

    <!-- Info Banner -->
    <div class="bg-surface-50 rounded-3xl p-6 border border-surface-200">
      <h3 class="font-bold text-surface-900 mb-4">Kenapa pilih AntarLaundry?</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          <div>
            <h4 class="font-bold text-sm text-surface-900">Gratis Antar Jemput</h4>
            <p class="text-xs text-surface-500 mt-1">Tanpa biaya tambahan</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
          <div>
            <h4 class="font-bold text-sm text-surface-900">Bersih & Wangi</h4>
            <p class="text-xs text-surface-500 mt-1">Kualitas terbaik</p>
          </div>
        </div>
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <h4 class="font-bold text-sm text-surface-900">Cepat & Tepat</h4>
            <p class="text-xs text-surface-500 mt-1">Sesuai estimasi waktu</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Right Sidebar / Panel -->
  <div class="w-full lg:w-80 bg-white p-6 lg:p-8 flex flex-col gap-8 h-full">
    
    <!-- Timeline (Desktop Only) -->
    <div class="hidden lg:block">
      {@render timeline()}
    </div>

    <!-- Promo Banner (Dynamic, set by admin) -->
    {#if data.activePromo}
    <div class="mt-auto pt-8">
      <div class="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-6 text-white overflow-hidden shadow-lg shadow-blue-500/30">
        <div class="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div class="absolute bottom-0 right-0 w-24 h-24 bg-blue-400 opacity-20 rounded-full blur-lg"></div>
        
        <span class="text-xs font-semibold text-blue-100 mb-1 block">Promo Spesial</span>
        <h3 class="text-2xl font-black mb-2">{data.activePromo.code}</h3>
        <p class="text-sm text-blue-100 mb-6 max-w-[140px]">{data.activePromo.description}</p>
        
        <a href="/dashboard/promo" class="inline-block bg-white text-blue-600 text-xs font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors shadow-sm">
          Gunakan Sekarang
        </a>
        
        <div class="absolute -bottom-2 -right-4 text-7xl opacity-90 drop-shadow-lg">
          🎁
        </div>
      </div>
    </div>
    {/if}

  </div>
</div>
