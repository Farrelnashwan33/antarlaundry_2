<script lang="ts">
	let { data } = $props();
	let orders = $derived(data.orders);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};
</script>

<svelte:head>
	<title>Riwayat Transaksi - Antar Laundry</title>
</svelte:head>

<div class="p-6 lg:p-10">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight text-surface-900">Riwayat Transaksi</h1>
			<p class="mt-1 text-surface-500">Daftar pesanan Anda yang sudah selesai atau dibatalkan</p>
		</div>
	</div>

	<div class="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm">
		{#if orders?.length === 0}
			<div class="py-12 text-center">
				<div class="mb-4 text-6xl opacity-50">📜</div>
				<h3 class="mb-2 text-xl font-bold text-surface-900">Belum ada riwayat</h3>
				<p class="mb-6 text-surface-500">
					Anda belum memiliki transaksi yang selesai atau dibatalkan.
				</p>
				<a
					href="/dashboard/orders"
					class="inline-block rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-blue-700"
					>Lihat Pesanan Aktif</a
				>
			</div>
		{:else}
			<div class="overflow-x-auto">
				<table class="w-full border-collapse text-left">
					<thead>
						<tr
							class="border-b-2 border-surface-100 text-sm font-semibold tracking-wider text-surface-500 uppercase"
						>
							<th class="p-4">No. Pesanan</th>
							<th class="p-4">Tanggal</th>
							<th class="p-4">Layanan</th>
							<th class="p-4">Status</th>
							<th class="p-4 text-right">Total</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-surface-100">
						{#each orders as order}
							<tr class="transition-colors hover:bg-surface-50">
								<td class="p-4 font-mono font-semibold text-surface-700"
									>#{order.orderNumber.split('-')[1]}</td
								>
								<td class="p-4 text-surface-600"
									>{new Date(order.createdAt).toLocaleDateString('id-ID')}</td
								>
								<td class="p-4 font-medium text-surface-900"
									>{order.items[0]?.service?.name || 'Laundry'}</td
								>
								<td class="p-4">
									<span
										class="rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase
                    {order.orderStatus === 'COMPLETED'
											? 'bg-green-100 text-green-700'
											: order.orderStatus === 'CANCELLED'
												? 'bg-red-100 text-red-700'
												: 'bg-blue-100 text-blue-700'}"
									>
										{order.orderStatus}
									</span>
								</td>
								<td class="p-4 text-right font-bold text-blue-600"
									>{formatCurrency(order.total || order.subtotal || 0)}</td
								>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
