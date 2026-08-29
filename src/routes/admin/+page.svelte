<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { data } = $props();
  let orders = $derived(data.orders);
  let couriers = $derived(data.couriers);
  let stats = $derived(data.stats);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Admin Dashboard - High Clean Pro</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full">
  
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <span>Admin</span>
    </div>
    <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Home</h1>
  </div>

  <!-- 4 Minimal Stat Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">Total Revenue (30 days)</div>
      <div class="text-3xl font-bold text-surface-900">{formatCurrency(stats.revenue)}</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">Average Revenue / Day</div>
      <div class="text-3xl font-bold text-surface-900">{formatCurrency(stats.revenue / 30 || 0)}</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">Total Orders (30 days)</div>
      <div class="text-3xl font-bold text-surface-900">{stats.completed + stats.inProgress + stats.pending}</div>
    </div>
    <div class="bg-white p-5 rounded-xl shadow-sm border border-surface-100 flex flex-col gap-2">
      <div class="text-sm text-surface-500">Average Orders / Day</div>
      <div class="text-3xl font-bold text-surface-900">{((stats.completed + stats.inProgress + stats.pending) / 30 || 0).toFixed(2)}</div>
    </div>
  </div>

  <!-- Middle Grid: Chart | Recent Orders | Services -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    
    <!-- Chart Section (Col-Span 3) -->
    <div class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-surface-100 p-5 flex flex-col relative overflow-hidden">
      <div class="flex justify-between items-center mb-6">
        <div class="flex bg-surface-100 p-0.5 rounded-md">
          <button class="px-3 py-1 bg-blue-500 text-white text-xs font-medium rounded shadow-sm">Week</button>
          <button class="px-3 py-1 text-surface-500 text-xs font-medium rounded hover:bg-surface-200">Month</button>
        </div>
        <button class="flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-100 transition-colors">
          Export CSV <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </button>
      </div>
      <div class="flex flex-col items-center justify-center pt-4 z-10">
        <span class="text-sm text-surface-500">Revenue</span>
        <span class="text-3xl font-bold text-surface-900 mt-1">{formatCurrency(stats.revenue)}</span>
      </div>
      <!-- Decorative SVG Chart Line -->
      <div class="absolute bottom-0 left-0 right-0 h-32 opacity-80 pointer-events-none">
         <svg viewBox="0 0 400 100" preserveAspectRatio="none" class="w-full h-full text-blue-500">
          <defs>
            <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="currentColor" stop-opacity="0.2"/>
              <stop offset="100%" stop-color="currentColor" stop-opacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0 60 C 50 20, 100 20, 130 60 C 160 100, 200 100, 240 70 C 280 40, 320 80, 400 60 L 400 100 L 0 100 Z" fill="url(#chartGradient)"/>
          <path d="M0 60 C 50 20, 100 20, 130 60 C 160 100, 200 100, 240 70 C 280 40, 320 80, 400 60" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <!-- Recent Orders (Col-Span 6) -->
    <div class="lg:col-span-6 bg-white rounded-xl shadow-sm border border-surface-100 p-5 flex flex-col">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-lg font-medium text-surface-900">Recent Orders</h3>
      </div>
      <div class="flex justify-between items-center mb-4">
        <h4 class="text-xl font-bold text-surface-900">Orders</h4>
        <div class="flex gap-2">
          <button class="flex items-center gap-1 border border-surface-200 text-surface-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Export CSV
          </button>
          <div class="relative">
            <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input type="text" placeholder="Search Orders" class="pl-9 pr-4 py-1.5 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500 w-48">
          </div>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left whitespace-nowrap">
          <thead class="text-[11px] uppercase tracking-wider text-surface-400 border-b border-surface-100">
            <tr>
              <th class="px-2 py-3 font-medium">ID</th>
              <th class="px-2 py-3 font-medium">Customer</th>
              <th class="px-2 py-3 font-medium">Weight/Total</th>
              <th class="px-2 py-3 font-medium">Status</th>
              <th class="px-2 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100/60">
            {#each orders.slice(0, 5) as order}
              <tr class="hover:bg-surface-50/50 transition-colors">
                <td class="px-2 py-4 text-surface-500 text-xs">
                  {order.orderNumber?.slice(-3) || order.id.slice(0, 3)}
                </td>
                <td class="px-2 py-4 text-surface-600 font-medium">
                  {order.customer.name}
                </td>
                <td class="px-2 py-4">
                  {#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP' || !order.total || Number(order.total) === 0}
                    <!-- Admin inputs weight to determine price -->
                    <div class="flex items-center gap-2">
                      <form method="POST" action="?/setWeightAndPrice" use:enhance class="flex gap-2 items-center">
                        <input type="hidden" name="orderId" value={order.id} />
                        <input type="hidden" name="itemId" value={order.items[0]?.id} />
                        <input 
                          type="text" 
                          inputmode="decimal"
                          name="weight" 
                          placeholder={order.items[0]?.weight ? `${order.items[0].weight} Kg` : "Kg"} 
                          class="w-14 px-2 py-1 text-[11px] border border-surface-200 rounded focus:border-blue-500 outline-none" 
                          required 
                        />
                        <button type="submit" class="px-2 py-1 text-[11px] bg-blue-50 text-blue-600 hover:bg-blue-100 rounded font-medium transition-colors">Set</button>
                      </form>
                      {#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP'}
                        <form method="POST" action="?/acceptOrder" use:enhance>
                          <input type="hidden" name="orderId" value={order.id} />
                          <button type="submit" class="text-[11px] bg-green-50 text-green-700 border border-green-200/60 font-bold px-2 py-1 rounded hover:bg-green-100 transition-colors shadow-sm">
                            Terima
                          </button>
                        </form>
                      {/if}
                    </div>
                  {:else}
                    <div class="flex items-center gap-1">
                      <span class="text-[10px] text-surface-400 font-medium">{order.items[0]?.weight} Kg</span>
                      <div class="text-green-600 bg-green-50 px-2 py-1 rounded inline-block text-[11px] font-semibold border border-green-100/50">
                        {formatCurrency(Number(order.total) || 0)}
                      </div>
                    </div>
                  {/if}
                </td>
                <td class="px-2 py-4">
                  {#if order.orderStatus === 'COMPLETED'}
                    <span class="text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Complete</span>
                  {:else if order.orderStatus === 'PROCESSING' || order.orderStatus === 'WASHING'}
                    <span class="text-amber-600 bg-amber-50 border border-amber-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">In Progress</span>
                  {:else}
                    <span class="text-orange-600 bg-orange-50 border border-orange-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{order.orderStatus}</span>
                  {/if}
                </td>
                <td class="px-2 py-4 text-right flex items-center justify-end gap-2">
                  {#if order.orderStatus === 'PROCESSING' || order.orderStatus === 'WASHING'}
                    <form method="POST" action="?/sendToCourier" use:enhance>
                      <input type="hidden" name="orderId" value={order.id} />
                      <button type="submit" class="text-[11px] bg-blue-50 text-blue-700 border border-blue-200/60 font-bold px-3 py-1.5 rounded hover:bg-blue-100 transition-colors shadow-sm">
                        Complete & Ship &rarr;
                      </button>
                    </form>
                  {:else if order.orderStatus === 'READY' || order.orderStatus === 'DELIVERY'}
                     <span class="text-[11px] text-surface-400 italic mr-1">Awaiting Courier</span>
                  {/if}

                  <!-- Delete Action -->
                  <form method="POST" action="?/deleteOrder" use:enhance onsubmit={(e) => { if(!confirm('Yakin ingin menghapus pesanan ini?')) e.preventDefault(); }}>
                    <input type="hidden" name="orderId" value={order.id} />
                    <button type="submit" class="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors" title="Delete Order">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </form>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="mt-4 text-right">
        <a href="/admin/orders" class="text-sm font-medium text-surface-900 border border-surface-200 px-4 py-2 rounded-md hover:bg-surface-50 inline-flex items-center gap-1 transition-colors">
          View all orders &rarr;
        </a>
      </div>
    </div>

    <!-- Services (Col-Span 3) -->
    <div class="lg:col-span-3 bg-white rounded-xl shadow-sm border border-surface-100 p-5 flex flex-col relative overflow-hidden">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-medium text-surface-900">Services</h3>
        <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </div>
      </div>
      <p class="text-xs text-surface-500 mb-6">Create, modify, and edit services your organization offers.</p>
      
      <div class="flex flex-col gap-3">
        <a href="/admin/services" class="flex justify-between items-center px-4 py-3 border border-surface-200 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors text-surface-800">
          All Services <svg class="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
        </a>
        <a href="/admin/services" class="flex justify-between items-center px-4 py-3 border border-surface-200 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors text-surface-800">
          Service Categories <svg class="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
        </a>
        <a href="/admin/services" class="flex justify-between items-center px-4 py-3 border border-surface-200 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors text-surface-800">
          Service Products <svg class="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
        </a>
        <a href="/admin/services" class="flex justify-between items-center px-4 py-3 border border-surface-200 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors text-surface-800">
          Service Product Variants <svg class="w-4 h-4 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Bottom Row: Users, Permissions, Roles, Analytics -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col justify-between min-h-[160px]">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-medium text-surface-900">Users</h3>
          <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
        </div>
        <p class="text-[11px] text-surface-500">View and manage all users for your organization.</p>
      </div>
      <a href="/admin/users" class="mt-4 flex items-center justify-center gap-2 border border-surface-200 text-surface-900 py-2 rounded-md text-xs font-medium hover:bg-surface-50 transition-colors">
        Users &rarr;
      </a>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col justify-between min-h-[160px]">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-medium text-surface-900">Permissions</h3>
          <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
        </div>
        <p class="text-[11px] text-surface-500">Modify permissions for each role in your organization.</p>
      </div>
      <a href="/admin/users" class="mt-4 flex items-center justify-center gap-2 border border-surface-200 text-surface-900 py-2 rounded-md text-xs font-medium hover:bg-surface-50 transition-colors">
        Permissions &rarr;
      </a>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col justify-between min-h-[160px]">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-medium text-surface-900">Roles</h3>
          <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
          </div>
        </div>
        <p class="text-[11px] text-surface-500">Create and edit roles for your organization.</p>
      </div>
      <a href="/admin/users" class="mt-4 flex items-center justify-center gap-2 border border-surface-200 text-surface-900 py-2 rounded-md text-xs font-medium hover:bg-surface-50 transition-colors">
        Roles &rarr;
      </a>
    </div>

    <div class="bg-white p-6 rounded-xl shadow-sm border border-surface-100 flex flex-col justify-between min-h-[160px]">
      <div>
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-medium text-surface-900">Analytics</h3>
          <div class="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
          </div>
        </div>
        <p class="text-[11px] text-surface-500">Track and analyze your website's data, including page views.</p>
      </div>
      <a href="/admin/analytics" class="mt-4 flex items-center justify-center gap-2 border border-surface-200 text-surface-900 py-2 rounded-md text-xs font-medium hover:bg-surface-50 transition-colors">
        Analytics &rarr;
      </a>
    </div>
  </div>
</div>
