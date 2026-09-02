<script lang="ts">
	let { data } = $props();
	let { topUps, stats } = data;

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};
</script>

<svelte:head>
	<title>Pantau Keuangan - Admin</title>
</svelte:head>

<div class="mx-auto max-w-7xl p-6">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-surface-900">Pantau Top Up & Dompet</h1>
		<p class="mt-1 text-surface-500">Laporan transaksi top up pelanggan</p>
	</div>

	<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
		<div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
			<p class="mb-1 text-sm font-medium text-surface-500">Total Top Up Sukses</p>
			<h3 class="text-2xl font-bold text-green-600">{stats.success}</h3>
			<p class="mt-2 text-xs text-surface-400">Dari {stats.total} percobaan</p>
		</div>
		<div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
			<p class="mb-1 text-sm font-medium text-surface-500">Total Nominal Sukses</p>
			<h3 class="text-2xl font-bold text-blue-600">{formatCurrency(stats.totalAmount)}</h3>
		</div>
		<div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
			<p class="mb-1 text-sm font-medium text-surface-500">Top Up Pending</p>
			<h3 class="text-2xl font-bold text-yellow-600">{stats.pending}</h3>
		</div>
		<div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
			<p class="mb-1 text-sm font-medium text-surface-500">Top Up Gagal</p>
			<h3 class="text-2xl font-bold text-red-600">{stats.failed}</h3>
		</div>
	</div>

	<div class="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
		<div class="flex items-center justify-between border-b border-surface-100 p-6">
			<h3 class="font-bold text-surface-900">Riwayat Top Up Terbaru</h3>
		</div>
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm text-surface-600">
				<thead class="bg-surface-50 text-xs font-semibold text-surface-700 uppercase">
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
						<tr class="transition-colors hover:bg-surface-50">
							<td class="px-6 py-4 font-mono text-xs">{topUp.orderId}</td>
							<td class="px-6 py-4">
								<div class="font-medium text-surface-900">{topUp.user.name}</div>
								<div class="text-xs">{topUp.user.email}</div>
							</td>
							<td class="px-6 py-4 font-bold text-surface-900">{formatCurrency(topUp.amount)}</td>
							<td class="mt-3 ml-6 inline-block rounded bg-surface-100 px-6 py-4 font-mono text-xs"
								>{topUp.paymentMethod || '-'}</td
							>
							<td class="px-6 py-4">
								{#if topUp.paymentStatus === 'PAID'}
									<span class="rounded-lg bg-green-100 px-2.5 py-1 text-xs font-bold text-green-700"
										>PAID</span
									>
								{:else if topUp.paymentStatus === 'PENDING'}
									<span
										class="rounded-lg bg-yellow-100 px-2.5 py-1 text-xs font-bold text-yellow-700"
										>PENDING</span
									>
								{:else}
									<span class="rounded-lg bg-red-100 px-2.5 py-1 text-xs font-bold text-red-700"
										>FAILED</span
									>
								{/if}
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								{new Date(topUp.createdAt).toLocaleDateString('id-ID', {
									day: 'numeric',
									month: 'short',
									year: 'numeric',
									hour: '2-digit',
									minute: '2-digit'
								})}
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
