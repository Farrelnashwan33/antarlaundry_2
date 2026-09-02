<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let storeQueue = $derived(data.storeQueue);
</script>

<svelte:head>
	<title>Store - Courier Dashboard</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<div
		class="flex items-center justify-between rounded-2xl border border-surface-100 bg-white p-4 shadow-sm"
	>
		<div>
			<h1 class="text-2xl font-bold text-surface-900">Store</h1>
			<p class="text-sm text-surface-500">Ambil tugas baru yang tersedia untuk dikerjakan</p>
		</div>
		<div
			class="rounded-lg border border-blue-100 bg-blue-50 px-3 py-1.5 text-sm font-bold text-blue-600"
		>
			{storeQueue.length} Available
		</div>
	</div>

	<div class="flex flex-col rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm whitespace-nowrap">
				<thead
					class="border-b border-surface-100 text-[11px] tracking-wider text-surface-400 uppercase"
				>
					<tr>
						<th class="px-2 py-3 font-medium">Customer</th>
						<th class="px-2 py-3 font-medium">Address</th>
						<th class="px-2 py-3 font-medium">Type</th>
						<th class="px-2 py-3 text-right font-medium">Action</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-100/60">
					{#each storeQueue as delivery}
						<tr class="transition-colors hover:bg-surface-50/50">
							<td class="px-2 py-4 text-surface-600">
								<div class="font-medium text-surface-900">{delivery.order.customer.name}</div>
								<div class="text-xs text-surface-400">
									{new Date(delivery.createdAt).toLocaleTimeString('id-ID', {
										hour: '2-digit',
										minute: '2-digit'
									})}
								</div>
							</td>
							<td
								class="max-w-[150px] truncate px-2 py-4 text-surface-500"
								title={delivery.type === 'PICKUP'
									? delivery.order.pickupAddress?.fullAddress
									: delivery.order.deliveryAddress?.fullAddress}
							>
								{delivery.type === 'PICKUP'
									? delivery.order.pickupAddress?.fullAddress || '-'
									: delivery.order.deliveryAddress?.fullAddress || '-'}
							</td>
							<td class="px-2 py-4">
								{#if delivery.type === 'PICKUP'}
									<span
										class="rounded-full border border-amber-100/50 bg-amber-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-amber-600 uppercase"
										>Pickup</span
									>
								{:else}
									<span
										class="rounded-full border border-blue-100/50 bg-blue-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-600 uppercase"
										>Delivery</span
									>
								{/if}
							</td>
							<td class="px-2 py-4 text-right">
								<form method="POST" action="?/acceptTask" use:enhance>
									<input type="hidden" name="deliveryId" value={delivery.id} />
									<button
										type="submit"
										class="rounded-md bg-surface-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-surface-800"
									>
										Ambil Tugas &rarr;
									</button>
								</form>
							</td>
						</tr>
					{/each}
					{#if storeQueue.length === 0}
						<tr>
							<td colspan="4" class="px-2 py-8 text-center text-surface-400">
								<div class="flex flex-col items-center justify-center gap-2">
									<span class="text-3xl">☕</span>
									<span class="text-sm">Tidak ada antrean baru.</span>
								</div>
							</td>
						</tr>
					{/if}
				</tbody>
			</table>
		</div>
	</div>
</div>
