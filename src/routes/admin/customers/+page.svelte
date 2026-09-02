<script lang="ts">
	let { data } = $props();
	let customers = $derived(data.customers);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};
</script>

<svelte:head>
	<title>Customers - Admin Dashboard</title>
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
			<span>Customers</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Customers</h1>
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
					placeholder="Search customers..."
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
						<th class="px-5 py-3 font-medium">Customer Info</th>
						<th class="px-5 py-3 font-medium">Contact</th>
						<th class="px-5 py-3 font-medium">Join Date</th>
						<th class="px-5 py-3 text-right font-medium">Orders</th>
						<th class="px-5 py-3 text-right font-medium">Total Spent</th>
						<th class="px-5 py-3 text-right font-medium">Last Order</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-100/60">
					{#each customers as customer}
						<tr class="transition-colors hover:bg-surface-50/50">
							<td class="px-5 py-4">
								<div class="flex items-center gap-3">
									<div
										class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600"
									>
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
									<span class="ml-1 text-xs text-surface-400"
										>({customer.completedOrderCount} done)</span
									>
								{/if}
							</td>
							<td class="px-5 py-4 text-right font-medium text-surface-900">
								{formatCurrency(customer.totalSpent)}
							</td>
							<td class="px-5 py-4 text-right text-xs text-surface-500">
								{customer.lastOrderDate
									? new Date(customer.lastOrderDate).toLocaleDateString('id-ID')
									: '-'}
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
		<div
			class="flex items-center justify-between border-t border-surface-100 p-4 text-sm text-surface-500"
		>
			<div>
				Showing <span class="font-medium text-surface-900">{customers.length}</span> results
			</div>
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
