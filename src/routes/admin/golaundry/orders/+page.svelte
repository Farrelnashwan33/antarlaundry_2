<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let orders = $derived(data.orders);
	let stats = $derived(data.stats);

	let pollingInterval: any;
	onMount(() => {
		pollingInterval = setInterval(() => {
			invalidateAll();
		}, 5000);
	});
	onDestroy(() => {
		if (pollingInterval) clearInterval(pollingInterval);
	});
</script>

<svelte:head>
	<title>Admin - Go Laundry Orders</title>
</svelte:head>

<div class="mb-8 flex items-center justify-between">
	<div>
		<h1 class="text-2xl font-bold text-surface-900">Go Laundry Orders</h1>
		<p class="text-sm text-surface-500">Monitor semua pesanan antar-jemput cepat</p>
	</div>
	<a
		href="/admin/golaundry/couriers"
		class="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100"
	>
		Monitor Kurir &rarr;
	</a>
</div>

<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
	<div class="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm">
		<div class="mb-1 text-xs font-bold tracking-wider text-surface-500 uppercase">Total Order</div>
		<div class="text-3xl font-black text-surface-900">{stats.total}</div>
	</div>
	<div
		class="rounded-2xl border border-l-4 border-surface-200 border-l-blue-500 bg-white p-5 shadow-sm"
	>
		<div class="mb-1 text-xs font-bold tracking-wider text-surface-500 uppercase">
			Menunggu Kurir
		</div>
		<div class="text-3xl font-black text-blue-600">{stats.waiting}</div>
	</div>
	<div
		class="rounded-2xl border border-l-4 border-surface-200 border-l-amber-500 bg-white p-5 shadow-sm"
	>
		<div class="mb-1 text-xs font-bold tracking-wider text-surface-500 uppercase">
			Dalam Perjalanan
		</div>
		<div class="text-3xl font-black text-amber-600">{stats.onDelivery}</div>
	</div>
	<div
		class="rounded-2xl border border-l-4 border-surface-200 border-l-green-500 bg-white p-5 shadow-sm"
	>
		<div class="mb-1 text-xs font-bold tracking-wider text-surface-500 uppercase">Selesai</div>
		<div class="text-3xl font-black text-green-600">{stats.completed}</div>
	</div>
</div>

<div class="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
	<div class="overflow-x-auto">
		<table class="w-full text-left text-sm whitespace-nowrap">
			<thead class="border-b border-surface-200 bg-surface-50 font-medium text-surface-600">
				<tr>
					<th class="px-6 py-4">Order ID</th>
					<th class="px-6 py-4">Status</th>
					<th class="px-6 py-4">Layanan</th>
					<th class="px-6 py-4">Customer</th>
					<th class="px-6 py-4">Kurir</th>
					<th class="px-6 py-4">Biaya Total</th>
					<th class="px-6 py-4">Waktu</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-surface-100">
				{#each orders as order}
					<tr class="transition-colors hover:bg-surface-50/50">
						<td class="px-6 py-4">
							<div class="font-mono font-bold text-surface-900">{order.orderNumber}</div>
						</td>
						<td class="px-6 py-4">
							<span
								class="rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wider uppercase
                {order.status === 'AVAILABLE'
									? 'bg-blue-100 text-blue-700'
									: order.status === 'COMPLETED'
										? 'bg-green-100 text-green-700'
										: order.status === 'CANCELLED'
											? 'bg-red-100 text-red-700'
											: 'bg-amber-100 text-amber-700'}"
							>
								{order.status.replace(/_/g, ' ')}
							</span>
						</td>
						<td class="px-6 py-4">
							<div class="font-medium text-surface-900">{order.serviceType.replace(/_/g, ' ')}</div>
							<div class="text-[11px] text-surface-500">
								{order.vehicleType.replace(/_/g, ' ')} • ±{order.estimatedWeight} kg
							</div>
						</td>
						<td class="px-6 py-4 text-surface-600">{order.customer?.name || '-'}</td>
						<td class="px-6 py-4 text-surface-600">{order.courier?.name || '-'}</td>
						<td class="px-6 py-4 font-medium text-surface-900"
							>Rp{order.deliveryFee.toLocaleString('id-ID')}</td
						>
						<td class="px-6 py-4 text-surface-500">
							{new Date(order.createdAt).toLocaleString('id-ID', {
								day: '2-digit',
								month: 'short',
								hour: '2-digit',
								minute: '2-digit'
							})}
						</td>
					</tr>
				{/each}
				{#if orders.length === 0}
					<tr>
						<td colspan="7" class="px-6 py-12 text-center text-surface-500"
							>Belum ada order Go Laundry</td
						>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>
</div>
