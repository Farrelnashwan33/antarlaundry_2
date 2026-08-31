<script lang="ts">
  let { data } = $props();
  let { topUps, stats } = data;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };
</script>

<svelte:head>
  <title>Pantau Keuangan - Admin</title>
</svelte:head>

<div class="p-6 max-w-7xl mx-auto">
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-surface-900">Pantau Top Up & Dompet</h1>
    <p class="text-surface-500 mt-1">Laporan transaksi top up pelanggan</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-200">
      <p class="text-sm font-medium text-surface-500 mb-1">Total Top Up Sukses</p>
      <h3 class="text-2xl font-bold text-green-600">{stats.success}</h3>
      <p class="text-xs text-surface-400 mt-2">Dari {stats.total} percobaan</p>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-200">
      <p class="text-sm font-medium text-surface-500 mb-1">Total Nominal Sukses</p>
      <h3 class="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalAmount)}</h3>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-200">
      <p class="text-sm font-medium text-surface-500 mb-1">Top Up Pending</p>
      <h3 class="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
    </div>
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-200">
      <p class="text-sm font-medium text-surface-500 mb-1">Top Up Gagal</p>
      <h3 class="text-2xl font-bold text-red-600">{stats.failed}</h3>
    </div>
  </div>

  <div class="bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
    <div class="p-6 border-b border-surface-100 flex justify-between items-center">
      <h3 class="font-bold text-surface-900">Riwayat Top Up Terbaru</h3>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-sm text-surface-600">
        <thead class="bg-surface-50 text-surface-700 text-xs uppercase font-semibold">
          <tr>
            <th class="px-6 py-4">ID Transaksi</th>
            <th class="px-6 py-4">Pelanggan</th>
            <th class="px-6 py-4">Nominal</th>
            <th class="px-6 py-4">Metode</th>
            <th class="px-6 py-4">Status</th>
            <th class="px-6 py-4">Tanggal</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-100">
          {#each topUps as topUp}
            <tr class="hover:bg-surface-50 transition-colors">
              <td class="px-6 py-4 font-mono text-xs">{topUp.orderId}</td>
              <td class="px-6 py-4">
                <div class="font-medium text-surface-900">{topUp.user.name}</div>
                <div class="text-xs">{topUp.user.email}</div>
              </td>
              <td class="px-6 py-4 font-bold text-surface-900">{formatCurrency(topUp.amount)}</td>
              <td class="px-6 py-4 text-xs font-mono bg-surface-100 rounded inline-block mt-3 ml-6">{topUp.paymentMethod || '-'}</td>
              <td class="px-6 py-4">
                {#if topUp.paymentStatus === 'PAID'}
                  <span class="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-bold">PAID</span>
                {:else if topUp.paymentStatus === 'PENDING'}
                  <span class="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">PENDING</span>
                {:else}
                  <span class="px-2.5 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-bold">FAILED</span>
                {/if}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {new Date(topUp.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </td>
            </tr>
          {/each}
          {#if topUps.length === 0}
            <tr>
              <td colspan="6" class="px-6 py-8 text-center text-surface-500">
                Belum ada data transaksi top up.
              </td>
            </tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>
</div>
