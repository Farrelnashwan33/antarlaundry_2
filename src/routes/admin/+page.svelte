<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { data } = $props();
	let orders = $derived(data.orders);
	let couriers = $derived(data.couriers);
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
	<title>Admin Dashboard - High Clean Pro</title>
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
			<span>Admin</span>
		</div>
		<h1 class="text-3xl font-bold tracking-tight text-surface-900">Home</h1>
	</div>

	<!-- 4 Minimal Stat Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">Total Revenue (30 days)</div>
			<div class="text-3xl font-bold text-surface-900">{formatCurrency(stats.revenue)}</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">Average Revenue / Day</div>
			<div class="text-3xl font-bold text-surface-900">
				{formatCurrency(stats.revenue / 30 || 0)}
			</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">Total Orders (30 days)</div>
			<div class="text-3xl font-bold text-surface-900">
				{stats.completed + stats.inProgress + stats.pending}
			</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">Average Orders / Day</div>
			<div class="text-3xl font-bold text-surface-900">
				{((stats.completed + stats.inProgress + stats.pending) / 30 || 0).toFixed(2)}
			</div>
		</div>
	</div>

	<!-- Middle Grid: Chart | Recent Orders | Services -->
	<div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
		<!-- Chart Section (Col-Span 3) -->
		<div
			class="relative flex flex-col overflow-hidden rounded-xl border border-surface-100 bg-white p-5 shadow-sm lg:col-span-3"
		>
			<div class="mb-6 flex items-center justify-between">
				<div class="flex rounded-md bg-surface-100 p-0.5">
					<button class="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-sm"
						>Week</button
					>
					<button
						class="rounded px-3 py-1 text-xs font-medium text-surface-500 hover:bg-surface-200"
						>Month</button
					>
				</div>
				<button
					class="flex items-center gap-1 rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition-colors hover:bg-blue-100"
				>
					Export CSV <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
						></path></svg
					>
				</button>
			</div>
			<div class="z-10 flex flex-col items-center justify-center pt-4">
				<span class="text-sm text-surface-500">Revenue</span>
				<span class="mt-1 text-3xl font-bold text-surface-900">{formatCurrency(stats.revenue)}</span
				>
			</div>
			<!-- Decorative SVG Chart Line -->
			<div class="pointer-events-none absolute right-0 bottom-0 left-0 h-32 opacity-80">
				<svg viewBox="0 0 400 100" preserveAspectRatio="none" class="h-full w-full text-blue-500">
					<defs>
						<linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
							<stop offset="0%" stop-color="currentColor" stop-opacity="0.2" />
							<stop offset="100%" stop-color="currentColor" stop-opacity="0" />
						</linearGradient>
					</defs>
					<path
						d="M0 60 C 50 20, 100 20, 130 60 C 160 100, 200 100, 240 70 C 280 40, 320 80, 400 60 L 400 100 L 0 100 Z"
						fill="url(#chartGradient)"
					/>
					<path
						d="M0 60 C 50 20, 100 20, 130 60 C 160 100, 200 100, 240 70 C 280 40, 320 80, 400 60"
						fill="none"
						stroke="currentColor"
						stroke-width="4"
						stroke-linecap="round"
					/>
				</svg>
			</div>
		</div>

		<!-- Recent Orders (Col-Span 6) -->
		<div
			class="flex flex-col rounded-xl border border-surface-100 bg-white p-5 shadow-sm lg:col-span-6"
		>
			<div class="mb-6 flex items-center justify-between">
				<h3 class="text-lg font-medium text-surface-900">Recent Orders</h3>
			</div>
			<div class="mb-4 flex items-center justify-between">
				<h4 class="text-xl font-bold text-surface-900">Orders</h4>
				<div class="flex gap-2">
					<button
						class="flex items-center gap-1 rounded-md border border-surface-200 px-3 py-1.5 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50"
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
					<div class="relative">
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
							placeholder="Search Orders"
							class="w-48 rounded-md border border-surface-200 py-1.5 pr-4 pl-9 text-sm focus:border-blue-500 focus:outline-none"
						/>
					</div>
				</div>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm whitespace-nowrap">
					<thead
						class="border-b border-surface-100 text-[11px] tracking-wider text-surface-400 uppercase"
					>
						<tr>
							<th class="px-2 py-3 font-medium">ID</th>
							<th class="px-2 py-3 font-medium">Customer</th>
							<th class="px-2 py-3 font-medium">Weight/Total</th>
							<th class="px-2 py-3 font-medium">Status</th>
							<th class="px-2 py-3 text-right font-medium">Action</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-surface-100/60">
						{#each orders.slice(0, 5) as order}
							<tr class="transition-colors hover:bg-surface-50/50">
								<td class="px-2 py-4 text-xs text-surface-500">
									{order.orderNumber?.slice(-3) || order.id.slice(0, 3)}
								</td>
								<td class="px-2 py-4 font-medium text-surface-600">
									{order.customer.name}
								</td>
								<td class="px-2 py-4">
									{#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP' || !order.total || Number(order.total) === 0}
										<!-- Admin inputs weight to determine price -->
										<div class="flex items-center gap-2">
											<form
												method="POST"
												action="?/setWeightAndPrice"
												use:enhance
												class="flex items-center gap-2"
											>
												<input type="hidden" name="orderId" value={order.id} />
												<input type="hidden" name="itemId" value={order.items[0]?.id} />
												<input
													type="text"
													inputmode="decimal"
													name="weight"
													placeholder={order.items[0]?.weight
														? `${order.items[0].weight} Kg`
														: 'Kg'}
													class="w-14 rounded border border-surface-200 px-2 py-1 text-[11px] outline-none focus:border-blue-500"
													required
												/>
												<button
													type="submit"
													class="rounded bg-blue-50 px-2 py-1 text-[11px] font-medium text-blue-600 transition-colors hover:bg-blue-100"
													>Set</button
												>
											</form>
										</div>
									{:else}
										<div class="flex items-center gap-1">
											<span class="text-[10px] font-medium text-surface-400"
												>{order.items[0]?.weight} Kg</span
											>
											<div
												class="inline-block rounded border border-green-100/50 bg-green-50 px-2 py-1 text-[11px] font-semibold text-green-600"
											>
												{formatCurrency(Number(order.total) || 0)}
											</div>
										</div>
									{/if}
								</td>
								<td class="px-2 py-4">
									{#if order.orderStatus === 'PENDING' || order.orderStatus === 'PICKUP'}
										{#if order.paymentStatus === 'UNPAID'}
											<span
												class="rounded border border-red-200 bg-red-50 px-2 py-1 text-[10px] font-bold text-red-500"
												>UNPAID</span
											>
										{:else}
											<form method="POST" action="/admin?/acceptOrder" use:enhance>
												<input type="hidden" name="orderId" value={order.id} />
												<button
													type="submit"
													class="rounded border border-green-200/60 bg-green-50 px-3 py-1.5 text-[11px] font-bold text-green-700 shadow-sm transition-colors hover:bg-green-100"
												>
													Terima
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
												<option value="READY" selected={order.orderStatus === 'READY'}>Ready</option
												>
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
										<span class="text-[11px] text-surface-400">-</span>
									{/if}
								</td>
								<td class="px-2 py-4">
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
								<td class="flex items-center justify-end gap-2 px-2 py-4 text-right">
									{#if order.orderStatus === 'PROCESSING' || order.orderStatus === 'WASHING'}
										<form method="POST" action="?/sendToCourier" use:enhance>
											<input type="hidden" name="orderId" value={order.id} />
											<button
												type="submit"
												class="rounded border border-blue-200/60 bg-blue-50 px-3 py-1.5 text-[11px] font-bold text-blue-700 shadow-sm transition-colors hover:bg-blue-100"
											>
												Complete & Ship &rarr;
											</button>
										</form>
									{:else if order.orderStatus === 'READY' || order.orderStatus === 'DELIVERY'}
										<span class="mr-1 text-[11px] text-surface-400 italic">Awaiting Courier</span>
									{/if}

									<!-- Delete Action -->
									<form
										method="POST"
										action="?/deleteOrder"
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
						{/each}
					</tbody>
				</table>
			</div>
			<div class="mt-4 text-right">
				<a
					href="/admin/orders"
					class="inline-flex items-center gap-1 rounded-md border border-surface-200 px-4 py-2 text-sm font-medium text-surface-900 transition-colors hover:bg-surface-50"
				>
					View all orders &rarr;
				</a>
			</div>
		</div>

		<!-- Services (Col-Span 3) -->
		<div
			class="relative flex flex-col overflow-hidden rounded-xl border border-surface-100 bg-white p-5 shadow-sm lg:col-span-3"
		>
			<div class="mb-2 flex items-start justify-between">
				<h3 class="text-lg font-medium text-surface-900">Services</h3>
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						></path></svg
					>
				</div>
			</div>
			<p class="mb-6 text-xs text-surface-500">
				Create, modify, and edit services your organization offers.
			</p>

			<div class="flex flex-col gap-3">
				<a
					href="/admin/services"
					class="flex items-center justify-between rounded-md border border-surface-200 px-4 py-3 text-sm font-medium text-surface-800 transition-colors hover:bg-surface-50"
				>
					All Services <svg
						class="h-4 w-4 text-surface-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
						></path></svg
					>
				</a>
				<a
					href="/admin/services"
					class="flex items-center justify-between rounded-md border border-surface-200 px-4 py-3 text-sm font-medium text-surface-800 transition-colors hover:bg-surface-50"
				>
					Service Categories <svg
						class="h-4 w-4 text-surface-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 10h16M4 14h16M4 18h16"
						></path></svg
					>
				</a>
				<a
					href="/admin/services"
					class="flex items-center justify-between rounded-md border border-surface-200 px-4 py-3 text-sm font-medium text-surface-800 transition-colors hover:bg-surface-50"
				>
					Service Products <svg
						class="h-4 w-4 text-surface-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
						></path></svg
					>
				</a>
				<a
					href="/admin/services"
					class="flex items-center justify-between rounded-md border border-surface-200 px-4 py-3 text-sm font-medium text-surface-800 transition-colors hover:bg-surface-50"
				>
					Service Product Variants <svg
						class="h-4 w-4 text-surface-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
						></path></svg
					>
				</a>
			</div>
		</div>
	</div>

	<!-- Bottom Row: Users, Permissions, Roles, Analytics (SUPER_ADMIN ONLY) -->
	{#if $page.data.user?.role === 'SUPER_ADMIN'}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
			<div
				class="flex min-h-[160px] flex-col justify-between rounded-xl border border-surface-100 bg-white p-6 shadow-sm"
			>
				<div>
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-medium text-surface-900">Users</h3>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
								></path></svg
							>
						</div>
					</div>
					<p class="text-[11px] text-surface-500">
						View and manage all users for your organization.
					</p>
				</div>
				<a
					href="/admin/users"
					class="mt-4 flex items-center justify-center gap-2 rounded-md border border-surface-200 py-2 text-xs font-medium text-surface-900 transition-colors hover:bg-surface-50"
				>
					Users &rarr;
				</a>
			</div>

			<div
				class="flex min-h-[160px] flex-col justify-between rounded-xl border border-surface-100 bg-white p-6 shadow-sm"
			>
				<div>
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-medium text-surface-900">Permissions</h3>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
								></path></svg
							>
						</div>
					</div>
					<p class="text-[11px] text-surface-500">
						Modify permissions for each role in your organization.
					</p>
				</div>
				<a
					href="/admin/users"
					class="mt-4 flex items-center justify-center gap-2 rounded-md border border-surface-200 py-2 text-xs font-medium text-surface-900 transition-colors hover:bg-surface-50"
				>
					Permissions &rarr;
				</a>
			</div>

			<div
				class="flex min-h-[160px] flex-col justify-between rounded-xl border border-surface-100 bg-white p-6 shadow-sm"
			>
				<div>
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-medium text-surface-900">Roles</h3>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
								></path></svg
							>
						</div>
					</div>
					<p class="text-[11px] text-surface-500">Create and edit roles for your organization.</p>
				</div>
				<a
					href="/admin/users"
					class="mt-4 flex items-center justify-center gap-2 rounded-md border border-surface-200 py-2 text-xs font-medium text-surface-900 transition-colors hover:bg-surface-50"
				>
					Roles &rarr;
				</a>
			</div>

			<div
				class="flex min-h-[160px] flex-col justify-between rounded-xl border border-surface-100 bg-white p-6 shadow-sm"
			>
				<div>
					<div class="mb-2 flex items-start justify-between">
						<h3 class="text-lg font-medium text-surface-900">Analytics</h3>
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white shadow-sm"
						>
							<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
								></path></svg
							>
						</div>
					</div>
					<p class="text-[11px] text-surface-500">
						View detailed analytics and business intelligence reports.
					</p>
				</div>
				<a
					href="/admin/analytics"
					class="mt-4 flex items-center justify-center gap-2 rounded-md border border-surface-200 py-2 text-xs font-medium text-surface-900 transition-colors hover:bg-surface-50"
				>
					Analytics &rarr;
				</a>
			</div>
		</div>
	{/if}
</div>
