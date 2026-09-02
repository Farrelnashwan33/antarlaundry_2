<script lang="ts">
	import { enhance } from '$app/forms';

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
	<title>Orders - Admin Dashboard</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<!-- Breadcrumb and Title -->
	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-2 text-[11px] font-medium text-surface-500">
			<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				></path></svg
			>
			<span>&rsaquo;</span>
			<a href="/admin" class="transition-colors hover:text-surface-900">Admin</a>
			<span>&rsaquo;</span>
			<span>Orders</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Orders</h1>
			<button
				class="flex items-center gap-1 rounded-md border border-surface-200 bg-white px-3 py-1.5 text-sm font-medium text-surface-700 shadow-sm transition-colors hover:bg-surface-50"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
					></path></svg
				> Export CSV
			</button>
		</div>
	</div>

	<div
		class="flex flex-col overflow-hidden rounded-xl border border-surface-100 bg-white shadow-sm"
	>
		<!-- Table Header/Filters -->
		<div
			class="flex flex-col items-start justify-between gap-4 border-b border-surface-100 p-5 md:flex-row md:items-center"
		>
			<div class="flex gap-2">
				<select
					class="rounded-md border border-surface-200 bg-white px-3 py-1.5 text-sm text-surface-700 outline-none focus:border-blue-500"
				>
					<option value="all">All Statuses</option>
					<option value="PENDING">Pending</option>
					<option value="PROCESSING">Processing</option>
					<option value="COMPLETED">Completed</option>
				</select>
			</div>
			<div class="relative w-full md:w-64">
				<svg
					class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-surface-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					></path></svg
				>
				<input
					type="text"
					placeholder="Search orders..."
					class="w-full rounded-md border border-surface-200 py-1.5 pr-4 pl-9 text-sm focus:border-blue-500 focus:outline-none"
				/>
			</div>
		</div>

		<!-- Table -->
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm whitespace-nowrap">
				<thead
					class="border-b border-surface-100 bg-surface-50/50 text-[11px] tracking-wider text-surface-400 uppercase"
				>
					<tr>
						<th class="px-5 py-3 font-medium">Order ID</th>
						<th class="px-5 py-3 font-medium">Date</th>
						<th class="px-5 py-3 font-medium">Customer</th>
						<th class="px-5 py-3 font-medium">Service</th>
						<th class="px-5 py-3 font-medium">Weight & Total</th>
						<th class="px-5 py-3 font-medium">Status</th>
						<th class="px-5 py-3 text-right font-medium">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-100/60">
					{#each orders as order}
						<tr class="transition-colors hover:bg-surface-50/50">
							<td class="px-5 py-4 font-medium text-surface-500">
								#{order.orderNumber}
							</td>
							<td class="px-5 py-4 text-surface-500">
								{new Date(order.createdAt).toLocaleDateString('id-ID')}
							</td>
							<td class="px-5 py-4">
								<div class="flex flex-col">
									<span class="font-medium text-surface-900">{order.customer.name}</span>
									<span class="text-xs text-surface-500"
										>{order.customer.phone || order.customer.email}</span
									>
								</div>
							</td>
							<td class="px-5 py-4 text-surface-600">
								{order.items[0]?.service?.name || 'N/A'}
							</td>
							<td class="px-5 py-4">
								{#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP' || !order.total || Number(order.total) === 0}
									<form
										method="POST"
										action="/admin?/setWeightAndPrice"
										use:enhance
										class="flex items-center gap-2"
									>
										<input type="hidden" name="orderId" value={order.id} />
										<input type="hidden" name="itemId" value={order.items[0]?.id} />
										<input
											type="text"
											inputmode="decimal"
											name="weight"
											placeholder={order.items[0]?.weight ? `${order.items[0].weight} Kg` : 'Kg'}
											class="w-16 rounded border border-surface-200 px-2 py-1 text-xs outline-none focus:border-blue-500"
											required
										/>
										<button
											type="submit"
											class="rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
											>Set</button
										>
									</form>
								{:else}
									<div class="flex flex-col">
										<span class="font-medium text-surface-900"
											>{formatCurrency(Number(order.total) || 0)}</span
										>
										<span class="text-xs text-surface-500">{order.items[0]?.weight} kg</span>
									</div>
								{/if}
							</td>
							<td class="px-5 py-4">
								{#if order.orderStatus === 'COMPLETED'}
									<span
										class="rounded-full border border-blue-100/50 bg-blue-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-600 uppercase"
										>Complete</span
									>
								{:else if order.orderStatus === 'PROCESSING' || order.orderStatus === 'WASHING'}
									<span
										class="rounded-full border border-amber-100/50 bg-amber-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-amber-600 uppercase"
										>In Progress</span
									>
								{:else}
									<span
										class="rounded-full border border-orange-100/50 bg-orange-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-orange-600 uppercase"
										>{order.orderStatus}</span
									>
								{/if}
							</td>
							<td class="flex items-center justify-end gap-2 px-5 py-4 text-right">
								{#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP'}
									{#if order.paymentStatus === 'UNPAID'}
										<span
											class="mr-2 rounded border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500"
											>UNPAID</span
										>
									{:else}
										<form method="POST" action="/admin?/acceptOrder" use:enhance>
											<input type="hidden" name="orderId" value={order.id} />
											<button
												type="submit"
												class="rounded border border-green-200/60 bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-700 shadow-sm transition-colors hover:bg-green-100"
											>
												Terima Pesanan
											</button>
										</form>
									{/if}
								{:else if !['COMPLETED', 'CANCELLED'].includes(order.orderStatus)}
									<form
										method="POST"
										action="/admin?/updateOrderStatus"
										use:enhance
										class="flex items-center gap-2"
									>
										<input type="hidden" name="orderId" value={order.id} />
										<select
											name="status"
											class="rounded border border-surface-200 bg-surface-50 px-2 py-1 text-[11px] focus:border-blue-500 focus:outline-none"
										>
											<option value="PROCESSING" selected={order.orderStatus === 'PROCESSING'}
												>Processing</option
											>
											<option value="WASHING" selected={order.orderStatus === 'WASHING'}
												>Washing</option
											>
											<option value="DRYING" selected={order.orderStatus === 'DRYING'}
												>Drying</option
											>
											<option value="IRONING" selected={order.orderStatus === 'IRONING'}
												>Ironing</option
											>
											<option value="READY" selected={order.orderStatus === 'READY'}>Ready</option>
											<option value="DELIVERY" selected={order.orderStatus === 'DELIVERY'}
												>Delivery</option
											>
											<option value="COMPLETED" selected={order.orderStatus === 'COMPLETED'}
												>Completed</option
											>
										</select>
										<button
											type="submit"
											class="rounded border border-blue-200/60 bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700 transition-colors hover:bg-blue-100"
										>
											Update
										</button>
									</form>
									{#if order.orderStatus === 'READY' || order.orderStatus === 'DELIVERY'}
										<span class="mt-1 block text-[10px] text-surface-400 italic"
											>Awaiting Courier</span
										>
									{/if}
								{:else}
									<span class="mr-2 text-[11px] text-surface-400">-</span>
								{/if}

								<!-- Delete Action -->
								<form
									method="POST"
									action="/admin?/deleteOrder"
									use:enhance
									onsubmit={(e) => {
										if (!confirm('Yakin ingin menghapus pesanan ini?')) e.preventDefault();
									}}
								>
									<input type="hidden" name="orderId" value={order.id} />
									<button
										type="submit"
										class="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
										title="Delete Order"
									>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
											><path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
											></path></svg
										>
									</button>
								</form>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="7" class="px-5 py-8 text-center text-surface-500"> No orders found. </td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		<div
			class="flex items-center justify-between border-t border-surface-100 p-4 text-sm text-surface-500"
		>
			<div>Showing <span class="font-medium text-surface-900">{orders.length}</span> results</div>
			<div class="flex gap-1">
				<button class="rounded-md border border-surface-200 px-2 py-1 hover:bg-surface-50" disabled
					>&larr;</button
				>
				<button class="rounded-md border border-surface-200 px-2 py-1 hover:bg-surface-50" disabled
					>&rarr;</button
				>
			</div>
		</div>
	</div>
</div>
