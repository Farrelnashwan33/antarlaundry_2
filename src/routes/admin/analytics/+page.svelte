<script lang="ts">
  let { data } = $props();
  let stats = $derived(data.stats);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Analytics - Admin Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full">
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <a href="/admin" class="hover:text-surface-900 transition-colors">Admin</a>
      <span>&rsaquo;</span>
      <span>Analytics</span>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Analytics</h1>
    </div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm font-medium text-surface-500">Total Revenue</div>
      <div class="text-3xl font-bold text-surface-900">{formatCurrency(stats.totalRevenue)}</div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm font-medium text-surface-500">Completed Orders</div>
      <div class="text-3xl font-bold text-green-600">{stats.completedOrders}</div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm font-medium text-surface-500">In Progress</div>
      <div class="text-3xl font-bold text-amber-600">{stats.inProgressOrders}</div>
    </div>
    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm font-medium text-surface-500">Pending & Pickup</div>
      <div class="text-3xl font-bold text-blue-600">{stats.pendingOrders}</div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Revenue Chart (CSS based) -->
    <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-bold text-surface-900">Revenue Overview</h3>
        <select class="text-sm border border-surface-200 rounded-md px-3 py-1.5 bg-white text-surface-700 outline-none focus:border-blue-500">
          <option>This Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>
      
      <div class="flex-1 flex items-end gap-2 md:gap-4 h-48 mt-4 border-b border-surface-200 pb-2 relative">
        <!-- Grid lines -->
        <div class="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div class="border-b border-dashed border-surface-100 w-full h-0"></div>
          <div class="border-b border-dashed border-surface-100 w-full h-0"></div>
          <div class="border-b border-dashed border-surface-100 w-full h-0"></div>
          <div class="border-b border-dashed border-surface-100 w-full h-0"></div>
        </div>
        
        <!-- Bars -->
        <div class="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10">
          <div class="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all h-[30%] relative">
             <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rp 120.000</div>
          </div>
          <span class="text-xs text-surface-500 mt-2">Mon</span>
        </div>
        <div class="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10">
          <div class="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all h-[45%] relative">
             <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rp 180.000</div>
          </div>
          <span class="text-xs text-surface-500 mt-2">Tue</span>
        </div>
        <div class="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10">
          <div class="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all h-[25%] relative">
             <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rp 100.000</div>
          </div>
          <span class="text-xs text-surface-500 mt-2">Wed</span>
        </div>
        <div class="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10">
          <div class="w-full bg-blue-500 hover:bg-blue-600 shadow-md shadow-blue-500/20 rounded-t-sm transition-all h-[70%] relative">
             <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rp 280.000</div>
          </div>
          <span class="text-xs font-bold text-blue-600 mt-2">Thu</span>
        </div>
        <div class="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10">
          <div class="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all h-[15%] relative">
             <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rp 60.000</div>
          </div>
          <span class="text-xs text-surface-500 mt-2">Fri</span>
        </div>
        <div class="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10">
          <div class="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all h-[40%] relative">
             <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rp 160.000</div>
          </div>
          <span class="text-xs text-surface-500 mt-2">Sat</span>
        </div>
        <div class="flex-1 flex flex-col items-center justify-end group cursor-pointer z-10">
          <div class="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm transition-all h-[55%] relative">
             <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Rp 220.000</div>
          </div>
          <span class="text-xs text-surface-500 mt-2">Sun</span>
        </div>
      </div>
    </div>

    <!-- Order Status Distribution -->
    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col">
      <h3 class="text-lg font-bold text-surface-900 mb-6">Order Status</h3>
      
      <div class="flex flex-col gap-4">
        <!-- Completed -->
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-surface-700 font-medium">Completed</span>
            <span class="text-green-600 font-bold">{stats.completedOrders}</span>
          </div>
          <div class="w-full bg-surface-100 rounded-full h-2">
            <div class="bg-green-500 h-2 rounded-full" style="width: {stats.totalOrders > 0 ? (stats.completedOrders / stats.totalOrders) * 100 : 0}%"></div>
          </div>
        </div>
        
        <!-- In Progress -->
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-surface-700 font-medium">In Progress</span>
            <span class="text-amber-600 font-bold">{stats.inProgressOrders}</span>
          </div>
          <div class="w-full bg-surface-100 rounded-full h-2">
            <div class="bg-amber-400 h-2 rounded-full" style="width: {stats.totalOrders > 0 ? (stats.inProgressOrders / stats.totalOrders) * 100 : 0}%"></div>
          </div>
        </div>
        
        <!-- Pending -->
        <div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-surface-700 font-medium">Pending / Pickup</span>
            <span class="text-blue-600 font-bold">{stats.pendingOrders}</span>
          </div>
          <div class="w-full bg-surface-100 rounded-full h-2">
            <div class="bg-blue-500 h-2 rounded-full" style="width: {stats.totalOrders > 0 ? (stats.pendingOrders / stats.totalOrders) * 100 : 0}%"></div>
          </div>
        </div>
      </div>
      
      <div class="mt-8 pt-6 border-t border-surface-100 text-center">
        <div class="text-3xl font-bold text-surface-900">{stats.totalOrders}</div>
        <div class="text-sm text-surface-500">Total Orders Lifetime</div>
      </div>
    </div>
  </div>
</div>
