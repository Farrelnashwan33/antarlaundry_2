<script lang="ts">
	let { data } = $props();
	let transactions = $derived(data.transactions);
	let searchQuery = $state('');

	let filteredTransactions = $derived(
		transactions.filter((trx: any) => {
			if (!searchQuery) return true;
			const q = searchQuery.toLowerCase();
			return (
				trx.orderNumber?.toLowerCase().includes(q) ||
				trx.customer.name?.toLowerCase().includes(q) ||
				trx.items[0]?.service?.name?.toLowerCase().includes(q)
			);
		})
	);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};

	const exportCSV = () => {
		if (filteredTransactions.length === 0) return;

		const headers = ['Order ID', 'Date', 'Customer', 'Service', 'Weight (kg)', 'Total Amount'];
		const rows = filteredTransactions.map((trx: any) => [
			`#${trx.orderNumber}`,
			new Date(trx.createdAt).toLocaleDateString('id-ID'),
			trx.customer.name,
			trx.items[0]?.service?.name || 'N/A',
			trx.items[0]?.weight || 0,
			trx.total || 0
		]);

		const csvContent = [
			headers.join(','),
			...rows.map((r: any[]) => r.map((cell) => `"${cell}"`).join(','))
		].join('\n');

		const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute(
			'download',
			`transactions_export_${new Date().toISOString().split('T')[0]}.csv`
		);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
</script>

<svelte:head>
	<title>Transactions - Admin Dashboard</title>
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
			<span>Transactions</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Transactions</h1>
			<button
				onclick={exportCSV}
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
					bind:value={searchQuery}
					placeholder="Search transactions..."
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
						<th class="px-5 py-3 text-right font-medium">Amount</th>
						<th class="px-5 py-3 text-right font-medium">Status</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-100/60">
					{#each filteredTransactions as trx}
						<tr class="transition-colors hover:bg-surface-50/50">
							<td class="px-5 py-4 font-medium text-surface-500">
								#{trx.orderNumber}
							</td>
							<td class="px-5 py-4 text-surface-500">
								{new Date(trx.createdAt).toLocaleDateString('id-ID')}
							</td>
							<td class="px-5 py-4 font-medium text-surface-900">
								{trx.customer.name}
							</td>
							<td class="px-5 py-4 text-surface-600">
								{trx.items[0]?.service?.name || 'N/A'} ({trx.items[0]?.weight}kg)
							</td>
							<td class="px-5 py-4 text-right font-medium text-green-600">
								{formatCurrency(trx.total || 0)}
							</td>
							<td class="px-5 py-4 text-right">
								<span
									class="rounded-full border border-blue-100/50 bg-blue-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blue-600 uppercase"
									>PAID</span
								>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6" class="px-5 py-8 text-center text-surface-500">
								{searchQuery
									? `No transactions match "${searchQuery}"`
									: 'No completed transactions found.'}
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
				Showing <span class="font-medium text-surface-900">{filteredTransactions.length}</span> results
			</div>
		</div>
	</div>
</div>
