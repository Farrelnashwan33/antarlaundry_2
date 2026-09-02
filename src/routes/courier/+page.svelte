<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	// Deriving data
	let activeDeliveries = $derived(data.activeDeliveries);
	let stats = $derived(data.stats);
	let profile = $derived(data.profile);

	const calcPct = (count: number) =>
		stats.totalTasks > 0 ? Math.round((count / stats.totalTasks) * 100) : 0;
</script>

<svelte:head>
	<title>Kurir Dashboard - GO LAUNDRY</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<!-- Title & Profile -->
	<div
		class="relative flex flex-col items-start justify-between gap-4 overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-md md:flex-row md:items-center"
	>
		<div class="absolute -top-10 -right-10 text-9xl opacity-10">🛵</div>
		<div class="relative z-10">
			<div class="mb-2 flex items-center gap-2 text-sm font-bold text-blue-100">
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 10V3L4 14h7v7l9-11h-7z"
					></path></svg
				>
				GO LAUNDRY
			</div>
			<h1 class="mb-2 text-3xl font-black tracking-tight">Halo, Kurir 👋</h1>
			<div class="flex items-center gap-3">
				<form method="POST" action="?/updateVehicle" use:enhance class="flex items-center gap-2">
					<label for="vehicleType" class="text-sm font-medium text-blue-100">Kendaraan:</label>
					<select
						id="vehicleType"
						name="vehicleType"
						onchange={(e) => e.currentTarget.form?.submit()}
						class="rounded-lg border border-blue-500/30 bg-blue-700/50 px-2 py-1 text-sm text-white focus:ring-1 focus:ring-blue-400 focus:outline-none"
					>
						<option value="MOTOR" selected={profile?.vehicleType === 'MOTOR'}>Motor (🛵)</option>
						<option value="MOTOR_BOX" selected={profile?.vehicleType === 'MOTOR_BOX'}
							>Motor Box (🛺)</option
						>
						<option value="MOBIL" selected={profile?.vehicleType === 'MOBIL'}>Mobil (🚗)</option>
					</select>
				</form>
				<span class="text-sm text-blue-100 opacity-50">|</span>
				<span class="text-sm text-blue-100">Rating: ⭐ 4.9</span>
			</div>
		</div>

		<div class="relative z-10 flex flex-col items-end gap-3">
			<form method="POST" action="?/toggleOnline" use:enhance>
				<button
					type="submit"
					class="flex items-center gap-2 rounded-full border border-white/20 bg-white/20 px-4 py-2 backdrop-blur-sm transition-colors hover:bg-white/30"
				>
					{#if profile?.isOnline}
						<span
							class="h-3 w-3 animate-pulse rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
						></span>
						<span class="text-sm font-bold text-white">ONLINE</span>
					{:else}
						<span class="h-3 w-3 rounded-full bg-surface-400"></span>
						<span class="text-sm font-bold text-surface-200">OFFLINE</span>
					{/if}
				</button>
			</form>
			<a
				href="/courier/golaundry/pool"
				class="w-full rounded-xl bg-white px-4 py-2 text-center text-sm font-bold text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
			>
				Cari Order Go Laundry &rarr;
			</a>
		</div>
	</div>

	<!-- 4 Minimal Stat Cards -->
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">All Tasks</div>
			<div class="text-3xl font-bold text-surface-900">{stats.totalTasks}</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">Store</div>
			<div class="text-3xl font-bold text-surface-900">{stats.globalQueueCount}</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">Active Tasks</div>
			<div class="text-3xl font-bold text-surface-900">{stats.activeCount}</div>
		</div>
		<div class="flex flex-col gap-2 rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
			<div class="text-sm text-surface-500">Finished Tasks</div>
			<div class="text-3xl font-bold text-surface-900">{stats.completedCount}</div>
		</div>
	</div>

	<!-- Tables Section -->
	<div class="flex w-full flex-col gap-6">
		<!-- Table: Active Tasks -->
		<div
			class="flex flex-col rounded-xl border border-surface-100 bg-white p-5 shadow-sm"
			id="history"
		>
			<div class="mb-6 flex items-center justify-between">
				<h3 class="text-lg font-medium text-surface-900">In Conversation</h3>
				<div
					class="rounded-md border border-amber-100 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-600"
				>
					{stats.activeCount} Active
				</div>
			</div>

			<div class="overflow-x-auto">
				<table class="w-full text-left text-sm whitespace-nowrap">
					<thead
						class="border-b border-surface-100 text-[11px] tracking-wider text-surface-400 uppercase"
					>
						<tr>
							<th class="px-2 py-3 font-medium">Customer</th>
							<th class="px-2 py-3 font-medium">Status</th>
							<th class="px-2 py-3 font-medium">Type</th>
							<th class="px-2 py-3 text-right font-medium">Action</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-surface-100/60">
						{#each activeDeliveries as delivery}
							<tr class="transition-colors hover:bg-surface-50/50">
								<td class="px-2 py-4 text-surface-600">
									<div class="font-medium text-surface-900">{delivery.order.customer.name}</div>
									<div class="text-[11px] text-surface-400">#{delivery.order.orderNumber}</div>
								</td>
								<td class="px-2 py-4 text-xs font-medium text-blue-600">
									{delivery.status}
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
									<form method="POST" action="?/completeTask" use:enhance>
										<input type="hidden" name="deliveryId" value={delivery.id} />
										<input type="hidden" name="orderId" value={delivery.orderId} />
										<button
											type="submit"
											class="rounded-md bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-green-600"
										>
											Selesai &rarr;
										</button>
									</form>
								</td>
							</tr>
						{/each}
						{#if activeDeliveries.length === 0}
							<tr>
								<td colspan="4" class="px-2 py-8 text-center text-xs text-surface-400">
									Anda belum mengambil tugas.
								</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
