<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let couriers = $derived(data.couriers);
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
	<title>Admin - Go Laundry Couriers</title>
</svelte:head>

<div class="mb-8 flex items-center justify-between">
	<div>
		<h1 class="text-2xl font-bold text-surface-900">Go Laundry Couriers</h1>
		<p class="text-sm text-surface-500">
			Monitor status kurir aktif untuk layanan antar-jemput cepat
		</p>
	</div>
	<a
		href="/admin/golaundry/orders"
		class="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100"
	>
		Monitor Orders &rarr;
	</a>
</div>

<div class="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
	<div class="rounded-2xl border border-surface-200 bg-white p-5 shadow-sm">
		<div class="mb-1 text-xs font-bold tracking-wider text-surface-500 uppercase">Total Kurir</div>
		<div class="text-3xl font-black text-surface-900">{stats.total}</div>
	</div>
	<div
		class="rounded-2xl border border-l-4 border-surface-200 border-l-green-500 bg-white p-5 shadow-sm"
	>
		<div class="mb-1 text-xs font-bold tracking-wider text-surface-500 uppercase">
			Online (Aktif)
		</div>
		<div class="text-3xl font-black text-green-600">{stats.online}</div>
	</div>
	<div
		class="rounded-2xl border border-l-4 border-surface-200 border-l-surface-300 bg-white p-5 shadow-sm"
	>
		<div class="mb-1 text-xs font-bold tracking-wider text-surface-500 uppercase">Offline</div>
		<div class="text-3xl font-black text-surface-400">{stats.offline}</div>
	</div>
</div>

<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
	{#each couriers as courier}
		<div
			class="group relative overflow-hidden rounded-3xl border border-surface-200 bg-white p-6 shadow-sm"
		>
			<!-- Status Indicator -->
			<div
				class="absolute top-0 right-0 flex items-center gap-1.5 rounded-bl-2xl px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase
        {courier.isOnline ? 'bg-green-100 text-green-700' : 'bg-surface-100 text-surface-500'}"
			>
				<span
					class="h-1.5 w-1.5 rounded-full {courier.isOnline
						? 'animate-pulse bg-green-500'
						: 'bg-surface-400'}"
				></span>
				{courier.isOnline ? 'ONLINE' : 'OFFLINE'}
			</div>

			<div class="mt-2 mb-6 flex items-center gap-4">
				<div
					class="flex h-14 w-14 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-xl font-bold text-blue-600"
				>
					{courier.name.charAt(0)}
				</div>
				<div>
					<h3 class="text-lg font-bold text-surface-900">{courier.name}</h3>
					<p class="text-sm text-surface-500">{courier.phone}</p>
				</div>
			</div>

			<div class="mb-4 grid grid-cols-2 gap-3">
				<div class="rounded-xl border border-surface-100 bg-surface-50 p-3">
					<div class="mb-1 text-[10px] font-bold tracking-wider text-surface-500 uppercase">
						Kendaraan
					</div>
					<div class="flex items-center gap-1 text-sm font-medium text-surface-900">
						{courier.vehicleType === 'MOTOR'
							? '🛵'
							: courier.vehicleType === 'MOTOR_BOX'
								? '🛺'
								: '🚗'}
						{courier.vehicleType.replace('_', ' ')}
					</div>
				</div>
				<div class="rounded-xl border border-surface-100 bg-surface-50 p-3">
					<div class="mb-1 text-[10px] font-bold tracking-wider text-surface-500 uppercase">
						Plat Nomor
					</div>
					<div class="text-sm font-medium text-surface-900">{courier.licensePlate}</div>
				</div>
			</div>

			<div class="flex items-center justify-between border-t border-surface-100 pt-4">
				<span class="text-xs font-medium text-surface-500">Order Diselesaikan</span>
				<span class="rounded-lg bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700"
					>{courier.completedOrders} Order</span
				>
			</div>
		</div>
	{/each}
</div>

{#if couriers.length === 0}
	<div class="rounded-3xl border border-surface-100 bg-white p-12 text-center shadow-sm">
		<div class="mb-4 text-5xl opacity-50">👥</div>
		<h3 class="mb-2 text-lg font-bold text-surface-900">Belum ada kurir</h3>
		<p class="text-sm text-surface-500">Tidak ada user dengan role COURIER yang ditemukan.</p>
	</div>
{/if}
