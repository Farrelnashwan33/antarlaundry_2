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
	<title>Pesanan Saya - Antar Laundry</title>
</svelte:head>

<div class="p-6 lg:p-10">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight text-surface-900">Pesanan Saya</h1>
			<p class="mt-1 text-surface-500">Daftar semua pesanan laundry Anda</p>
		</div>
	</div>

	<div class="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm">
		{#if orders?.length === 0}
			<div class="py-12 text-center">
				<div class="mb-4 text-6xl opacity-50">📦</div>
				<h3 class="mb-2 text-xl font-bold text-surface-900">Belum ada pesanan</h3>
				<p class="mb-6 text-surface-500">Anda belum pernah membuat pesanan sebelumnya.</p>
				<a
					href="/dashboard/order/new"
					class="inline-block rounded-xl bg-blue-600 px-8 py-3 font-bold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-blue-700"
					>Buat Pesanan Pertama</a
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
								<td class="p-4 font-medium text-surface-900">
									{order.items[0]?.service?.name || 'Laundry'}
								</td>
								<td class="p-4">
									<div class="flex flex-col gap-1">
										<span
											class="w-fit rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase
											{order.orderStatus === 'COMPLETED'
												? 'bg-green-100 text-green-700'
												: order.orderStatus === 'CANCELLED'
													? 'bg-red-100 text-red-700'
													: 'bg-blue-100 text-blue-700'}"
										>
											{order.orderStatus}
										</span>
										<span
											class="w-fit rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase
											{order.paymentStatus === 'PAID'
												? 'bg-green-100 text-green-700'
												: order.paymentStatus === 'UNPAID'
													? 'bg-red-100 text-red-700'
													: 'bg-amber-100 text-amber-700'}"
										>
											{order.paymentStatus}
										</span>
									</div>
								</td>
								<td class="p-4 text-right">
									<div class="font-bold text-blue-600 mb-2">
										{formatCurrency(order.total || order.subtotal || 0)}
									</div>
									<div class="flex items-center justify-end gap-2">
										{#if order.orderStatus === 'PENDING'}
											<form method="POST" action="?/cancelOrder">
												<input type="hidden" name="orderId" value={order.id} />
												<button
													type="submit"
													class="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
													onclick={(e) => { if (!confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) e.preventDefault(); }}
												>
													Batalkan
												</button>
											</form>
										{/if}
										{#if order.paymentStatus === 'UNPAID' && (order.total > 0 || order.subtotal > 0)}
											<form method="POST" action="?/payOrder">
												<input type="hidden" name="orderId" value={order.id} />
												<button
													type="submit"
													class="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
												>
													Bayar
												</button>
											</form>
										{/if}
									</div>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
