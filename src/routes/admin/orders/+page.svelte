<script lang="ts">
  import { enhance } from '$app/forms';
  
  let { data } = $props();
  let orders = $derived(data.orders);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Orders - Admin Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full">
  
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <a href="/admin" class="hover:text-surface-900 transition-colors">Admin</a>
      <span>&rsaquo;</span>
      <span>Orders</span>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Orders</h1>
      <button class="flex items-center gap-1 border border-surface-200 text-surface-700 bg-white shadow-sm px-3 py-1.5 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Export CSV
      </button>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border border-surface-100 flex flex-col overflow-hidden">
    <!-- Table Header/Filters -->
    <div class="p-5 border-b border-surface-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="flex gap-2">
        <select class="text-sm border border-surface-200 rounded-md px-3 py-1.5 bg-white text-surface-700 outline-none focus:border-blue-500">
          <option value="all">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="PROCESSING">Processing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>
      <div class="relative w-full md:w-64">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input type="text" placeholder="Search orders..." class="w-full pl-9 pr-4 py-1.5 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500">
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left whitespace-nowrap">
        <thead class="text-[11px] uppercase tracking-wider text-surface-400 border-b border-surface-100 bg-surface-50/50">
          <tr>
            <th class="px-5 py-3 font-medium">Order ID</th>
            <th class="px-5 py-3 font-medium">Date</th>
            <th class="px-5 py-3 font-medium">Customer</th>
            <th class="px-5 py-3 font-medium">Service</th>
            <th class="px-5 py-3 font-medium">Weight & Total</th>
            <th class="px-5 py-3 font-medium">Status</th>
            <th class="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-100/60">
          {#each orders as order}
            <tr class="hover:bg-surface-50/50 transition-colors">
              <td class="px-5 py-4 text-surface-500 font-medium">
                #{order.orderNumber}
              </td>
              <td class="px-5 py-4 text-surface-500">
                {new Date(order.createdAt).toLocaleDateString('id-ID')}
              </td>
              <td class="px-5 py-4">
                <div class="flex flex-col">
                  <span class="font-medium text-surface-900">{order.customer.name}</span>
                  <span class="text-xs text-surface-500">{order.customer.phone || order.customer.email}</span>
                </div>
              </td>
              <td class="px-5 py-4 text-surface-600">
                {order.items[0]?.service?.name || 'N/A'}
              </td>
              <td class="px-5 py-4">
                {#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP' || !order.total || Number(order.total) === 0}
                  <form method="POST" action="/admin?/setWeightAndPrice" use:enhance class="flex gap-2 items-center">
                    <input type="hidden" name="orderId" value={order.id} />
                    <input type="hidden" name="itemId" value={order.items[0]?.id} />
                    <input 
                      type="text" 
                      inputmode="decimal"
                      name="weight" 
                      placeholder={order.items[0]?.weight ? `${order.items[0].weight} Kg` : "Kg"} 
                      class="w-16 px-2 py-1 text-xs border border-surface-200 rounded focus:border-blue-500 outline-none" 
                      required 
                    />
                    <button type="submit" class="px-2 py-1 text-xs bg-blue-50 text-blue-600 hover:bg-blue-100 rounded font-medium transition-colors">Set</button>
                  </form>
                {:else}
                  <div class="flex flex-col">
                    <span class="text-surface-900 font-medium">{formatCurrency(Number(order.total) || 0)}</span>
                    <span class="text-xs text-surface-500">{order.items[0]?.weight} kg</span>
                  </div>
                {/if}
              </td>
              <td class="px-5 py-4">
                {#if order.orderStatus === 'COMPLETED'}
                  <span class="text-blue-600 bg-blue-50 border border-blue-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Complete</span>
                {:else if order.orderStatus === 'PROCESSING' || order.orderStatus === 'WASHING'}
                  <span class="text-amber-600 bg-amber-50 border border-amber-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">In Progress</span>
                {:else}
                  <span class="text-orange-600 bg-orange-50 border border-orange-100/50 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{order.orderStatus}</span>
                {/if}
              </td>
              <td class="px-5 py-4 text-right flex items-center justify-end gap-2">
                {#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP'}
                  <form method="POST" action="/admin?/acceptOrder" use:enhance>
                    <input type="hidden" name="orderId" value={order.id} />
                    <button type="submit" class="text-[11px] bg-green-50 text-green-700 border border-green-200/60 font-bold px-3 py-1.5 rounded hover:bg-green-100 transition-colors shadow-sm">
                      Terima Pesanan
                    </button>
                  </form>
                {:else if order.orderStatus === 'PROCESSING' || order.orderStatus === 'WASHING'}
                  <form method="POST" action="/admin?/sendToCourier" use:enhance>
                    <input type="hidden" name="orderId" value={order.id} />
                    <button type="submit" class="text-[11px] bg-blue-50 text-blue-700 border border-blue-200/60 font-bold px-3 py-1.5 rounded hover:bg-blue-100 transition-colors shadow-sm">
                      Complete & Ship &rarr;
                    </button>
                  </form>
                {:else if order.orderStatus === 'READY' || order.orderStatus === 'DELIVERY'}
                   <span class="text-[11px] text-surface-400 italic mr-2">Awaiting Courier</span>
                {:else}
                  <span class="text-[11px] text-surface-400 mr-2">-</span>
                {/if}

                <!-- Delete Action -->
                <form method="POST" action="/admin?/deleteOrder" use:enhance onsubmit={(e) => { if(!confirm('Yakin ingin menghapus pesanan ini?')) e.preventDefault(); }}>
                  <input type="hidden" name="orderId" value={order.id} />
                  <button type="submit" class="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50 transition-colors" title="Delete Order">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </form>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="7" class="px-5 py-8 text-center text-surface-500">
                No orders found.
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-4 border-t border-surface-100 flex items-center justify-between text-sm text-surface-500">
      <div>Showing <span class="font-medium text-surface-900">{orders.length}</span> results</div>
      <div class="flex gap-1">
        <button class="px-2 py-1 border border-surface-200 rounded-md hover:bg-surface-50" disabled>&larr;</button>
        <button class="px-2 py-1 border border-surface-200 rounded-md hover:bg-surface-50" disabled>&rarr;</button>
      </div>
    </div>
  </div>
</div>
