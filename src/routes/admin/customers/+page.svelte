<script lang="ts">
  let { data } = $props();
  let customers = $derived(data.customers);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Customers - Admin Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-6 w-full">
  
  <!-- Breadcrumb and Title -->
  <div class="flex flex-col gap-1">
    <div class="flex items-center gap-2 text-[11px] text-surface-500 font-medium">
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
      <span>&rsaquo;</span>
      <a href="/admin" class="hover:text-surface-900 transition-colors">Admin</a>
      <span>&rsaquo;</span>
      <span>Customers</span>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-surface-900 tracking-tight">Customers</h1>
      <button class="flex items-center gap-1 border border-surface-200 text-surface-700 bg-white shadow-sm px-3 py-1.5 rounded-md text-sm font-medium hover:bg-surface-50 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> Export CSV
      </button>
    </div>
  </div>

  <div class="bg-white rounded-xl shadow-sm border border-surface-100 flex flex-col overflow-hidden">
    <!-- Table Header/Filters -->
    <div class="p-5 border-b border-surface-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div class="relative w-full md:w-64">
        <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        <input type="text" placeholder="Search customers..." class="w-full pl-9 pr-4 py-1.5 text-sm border border-surface-200 rounded-md focus:outline-none focus:border-blue-500">
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-sm text-left whitespace-nowrap">
        <thead class="text-[11px] uppercase tracking-wider text-surface-400 border-b border-surface-100 bg-surface-50/50">
          <tr>
            <th class="px-5 py-3 font-medium">Customer Info</th>
            <th class="px-5 py-3 font-medium">Contact</th>
            <th class="px-5 py-3 font-medium">Join Date</th>
            <th class="px-5 py-3 font-medium text-right">Orders</th>
            <th class="px-5 py-3 font-medium text-right">Total Spent</th>
            <th class="px-5 py-3 font-medium text-right">Last Order</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-100/60">
          {#each customers as customer}
            <tr class="hover:bg-surface-50/50 transition-colors">
              <td class="px-5 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    {customer.name.substring(0, 2).toUpperCase()}
                  </div>
                  <span class="font-medium text-surface-900">{customer.name}</span>
                </div>
              </td>
              <td class="px-5 py-4">
                <div class="flex flex-col">
                  <span class="text-surface-600">{customer.email}</span>
                  <span class="text-xs text-surface-500">{customer.phone || '-'}</span>
                </div>
              </td>
              <td class="px-5 py-4 text-surface-500">
                {new Date(customer.createdAt).toLocaleDateString('id-ID')}
              </td>
              <td class="px-5 py-4 text-right">
                <span class="font-medium text-surface-900">{customer.orderCount}</span>
                {#if customer.orderCount > 0}
                  <span class="text-xs text-surface-400 ml-1">({customer.completedOrderCount} done)</span>
                {/if}
              </td>
              <td class="px-5 py-4 text-right font-medium text-surface-900">
                {formatCurrency(customer.totalSpent)}
              </td>
              <td class="px-5 py-4 text-right text-surface-500 text-xs">
                {customer.lastOrderDate ? new Date(customer.lastOrderDate).toLocaleDateString('id-ID') : '-'}
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="6" class="px-5 py-8 text-center text-surface-500">
                No customers found.
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="p-4 border-t border-surface-100 flex items-center justify-between text-sm text-surface-500">
      <div>Showing <span class="font-medium text-surface-900">{customers.length}</span> results</div>
      <div class="flex gap-1">
        <button class="px-2 py-1 border border-surface-200 rounded-md hover:bg-surface-50" disabled>&larr;</button>
        <button class="px-2 py-1 border border-surface-200 rounded-md hover:bg-surface-50" disabled>&rarr;</button>
      </div>
    </div>
  </div>
</div>
