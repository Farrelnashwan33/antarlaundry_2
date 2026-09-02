<script lang="ts">
	let { data } = $props();
	let stats = $derived(data.stats);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};
</script>

<svelte:head>
	<title>Analytics - Admin Dashboard</title>
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
			<span>Analytics</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Analytics</h1>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-6 shadow-sm">
			<div class="text-sm font-medium text-surface-500">Total Revenue</div>
			<div class="text-3xl font-bold text-surface-900">{formatCurrency(stats.totalRevenue)}</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-6 shadow-sm">
			<div class="text-sm font-medium text-surface-500">Completed Orders</div>
			<div class="text-3xl font-bold text-green-600">{stats.completedOrders}</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-6 shadow-sm">
			<div class="text-sm font-medium text-surface-500">In Progress</div>
			<div class="text-3xl font-bold text-amber-600">{stats.inProgressOrders}</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-6 shadow-sm">
			<div class="text-sm font-medium text-surface-500">Pending & Pickup</div>
			<div class="text-3xl font-bold text-blue-600">{stats.pendingOrders}</div>
		</div>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Revenue Chart (CSS based) -->
		<div
			class="flex flex-col rounded-xl border border-surface-100 bg-white p-6 shadow-sm lg:col-span-2"
		>
			<div class="mb-6 flex items-center justify-between">
				<h3 class="text-lg font-bold text-surface-900">Revenue Overview</h3>
				<select
					class="rounded-md border border-surface-200 bg-white px-3 py-1.5 text-sm text-surface-700 outline-none focus:border-blue-500"
				>
					<option>This Week</option>
					<option>This Month</option>
					<option>This Year</option>
				</select>
			</div>

			<div
				class="relative mt-4 flex h-48 flex-1 items-end gap-2 border-b border-surface-200 pb-2 md:gap-4"
			>
				<!-- Grid lines -->
				<div class="pointer-events-none absolute inset-0 flex flex-col justify-between">
					<div class="h-0 w-full border-b border-dashed border-surface-100"></div>
					<div class="h-0 w-full border-b border-dashed border-surface-100"></div>
					<div class="h-0 w-full border-b border-dashed border-surface-100"></div>
					<div class="h-0 w-full border-b border-dashed border-surface-100"></div>
				</div>

				<!-- Bars -->
				<div class="group z-10 flex flex-1 cursor-pointer flex-col items-center justify-end">
					<div
						class="relative h-[30%] w-full rounded-t-sm bg-blue-100 transition-all hover:bg-blue-200"
					>
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-surface-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							Rp 120.000
						</div>
					</div>
					<span class="mt-2 text-xs text-surface-500">Mon</span>
				</div>
				<div class="group z-10 flex flex-1 cursor-pointer flex-col items-center justify-end">
					<div
						class="relative h-[45%] w-full rounded-t-sm bg-blue-100 transition-all hover:bg-blue-200"
					>
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-surface-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							Rp 180.000
						</div>
					</div>
					<span class="mt-2 text-xs text-surface-500">Tue</span>
				</div>
				<div class="group z-10 flex flex-1 cursor-pointer flex-col items-center justify-end">
					<div
						class="relative h-[25%] w-full rounded-t-sm bg-blue-100 transition-all hover:bg-blue-200"
					>
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-surface-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							Rp 100.000
						</div>
					</div>
					<span class="mt-2 text-xs text-surface-500">Wed</span>
				</div>
				<div class="group z-10 flex flex-1 cursor-pointer flex-col items-center justify-end">
					<div
						class="relative h-[70%] w-full rounded-t-sm bg-blue-500 shadow-md shadow-blue-500/20 transition-all hover:bg-blue-600"
					>
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-surface-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							Rp 280.000
						</div>
					</div>
					<span class="mt-2 text-xs font-bold text-blue-600">Thu</span>
				</div>
				<div class="group z-10 flex flex-1 cursor-pointer flex-col items-center justify-end">
					<div
						class="relative h-[15%] w-full rounded-t-sm bg-blue-100 transition-all hover:bg-blue-200"
					>
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-surface-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							Rp 60.000
						</div>
					</div>
					<span class="mt-2 text-xs text-surface-500">Fri</span>
				</div>
				<div class="group z-10 flex flex-1 cursor-pointer flex-col items-center justify-end">
					<div
						class="relative h-[40%] w-full rounded-t-sm bg-blue-100 transition-all hover:bg-blue-200"
					>
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-surface-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							Rp 160.000
						</div>
					</div>
					<span class="mt-2 text-xs text-surface-500">Sat</span>
				</div>
				<div class="group z-10 flex flex-1 cursor-pointer flex-col items-center justify-end">
					<div
						class="relative h-[55%] w-full rounded-t-sm bg-blue-100 transition-all hover:bg-blue-200"
					>
						<div
							class="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-surface-900 px-2 py-1 text-[10px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100"
						>
							Rp 220.000
						</div>
					</div>
					<span class="mt-2 text-xs text-surface-500">Sun</span>
				</div>
			</div>
		</div>

		<!-- Order Status Distribution -->
		<div class="flex flex-col rounded-xl border border-surface-100 bg-white p-6 shadow-sm">
			<h3 class="mb-6 text-lg font-bold text-surface-900">Order Status</h3>

			<div class="flex flex-col gap-4">
				<!-- Completed -->
				<div>
					<div class="mb-1 flex justify-between text-sm">
						<span class="font-medium text-surface-700">Completed</span>
						<span class="font-bold text-green-600">{stats.completedOrders}</span>
					</div>
					<div class="h-2 w-full rounded-full bg-surface-100">
						<div
							class="h-2 rounded-full bg-green-500"
							style="width: {stats.totalOrders > 0
								? (stats.completedOrders / stats.totalOrders) * 100
								: 0}%"
						></div>
					</div>
				</div>

				<!-- In Progress -->
				<div>
					<div class="mb-1 flex justify-between text-sm">
						<span class="font-medium text-surface-700">In Progress</span>
						<span class="font-bold text-amber-600">{stats.inProgressOrders}</span>
					</div>
					<div class="h-2 w-full rounded-full bg-surface-100">
						<div
							class="h-2 rounded-full bg-amber-400"
							style="width: {stats.totalOrders > 0
								? (stats.inProgressOrders / stats.totalOrders) * 100
								: 0}%"
						></div>
					</div>
				</div>

				<!-- Pending -->
				<div>
					<div class="mb-1 flex justify-between text-sm">
						<span class="font-medium text-surface-700">Pending / Pickup</span>
						<span class="font-bold text-blue-600">{stats.pendingOrders}</span>
					</div>
					<div class="h-2 w-full rounded-full bg-surface-100">
						<div
							class="h-2 rounded-full bg-blue-500"
							style="width: {stats.totalOrders > 0
								? (stats.pendingOrders / stats.totalOrders) * 100
								: 0}%"
						></div>
					</div>
				</div>
			</div>

			<div class="mt-8 border-t border-surface-100 pt-6 text-center">
				<div class="text-3xl font-bold text-surface-900">{stats.totalOrders}</div>
				<div class="text-sm text-surface-500">Total Orders Lifetime</div>
			</div>
		</div>
	</div>
</div>
