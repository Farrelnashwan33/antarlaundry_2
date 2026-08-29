<script lang="ts">
  let { data } = $props();
  let orders = $derived(data.orders);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Riwayat Transaksi - Antar Laundry</title>
</svelte:head>

<div class="p-6 lg:p-10">
  <div class="flex justify-between items-center mb-8">
    <div>
      <h1 class="text-3xl font-extrabold text-surface-900 tracking-tight">Riwayat Transaksi</h1>
      <p class="text-surface-500 mt-1">Daftar pesanan Anda yang sudah selesai atau dibatalkan</p>
    </div>
  </div>

  <div class="bg-white border border-surface-200 rounded-3xl p-6 shadow-sm">
    {#if orders?.length === 0}
      <div class="text-center py-12">
        <div class="text-6xl mb-4 opacity-50">📜</div>
        <h3 class="text-xl font-bold text-surface-900 mb-2">Belum ada riwayat</h3>
        <p class="text-surface-500 mb-6">Anda belum memiliki transaksi yang selesai atau dibatalkan.</p>
        <a href="/dashboard/orders" class="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 transition-colors shadow-md shadow-blue-500/20">Lihat Pesanan Aktif</a>
      </div>
    {:else}
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-surface-100 text-sm font-semibold text-surface-500 uppercase tracking-wider">
              <th class="p-4">No. Pesanan</th>
              <th class="p-4">Tanggal</th>
              <th class="p-4">Layanan</th>
              <th class="p-4">Status</th>
              <th class="p-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-100">
            {#each orders as order}
              <tr class="hover:bg-surface-50 transition-colors">
                <td class="p-4 font-mono font-semibold text-surface-700">#{order.orderNumber.split('-')[1]}</td>
                <td class="p-4 text-surface-600">{new Date(order.createdAt).toLocaleDateString('id-ID')}</td>
                <td class="p-4 font-medium text-surface-900">{order.items[0]?.service?.name || 'Laundry'}</td>
                <td class="p-4">
                  <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                    {order.orderStatus === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                     order.orderStatus === 'CANCELLED' ? 'bg-red-100 text-red-700' : 
                     'bg-blue-100 text-blue-700'}">
                    {order.orderStatus}
                  </span>
                </td>
                <td class="p-4 text-right font-bold text-blue-600">{formatCurrency(order.total || order.subtotal || 0)}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  </div>
</div>
