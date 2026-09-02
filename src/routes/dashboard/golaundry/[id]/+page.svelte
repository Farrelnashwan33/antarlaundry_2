<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { data } = $props();
	let order = $derived(data.order);

	let pollingInterval: any;

	onMount(() => {
		// Poll every 5 seconds if order is not completed or cancelled
		if (!['COMPLETED', 'CANCELLED'].includes(order.status)) {
			pollingInterval = setInterval(() => {
				invalidateAll();
			}, 5000);
		}
	});

	onDestroy(() => {
		if (pollingInterval) clearInterval(pollingInterval);
	});

	const getStepStatus = (status: string, target: string) => {
		const flow = [
			'AVAILABLE',
			'CLAIMING',
			'ASSIGNED',
			'HEADING_TO_PICKUP',
			'PICKED_UP',
			'ON_DELIVERY',
			'COMPLETED',
			'CANCELLED'
		];
		const curIdx = flow.indexOf(status);
		const targetIdx = flow.indexOf(target);

		if (status === 'CANCELLED') return 'upcoming';
		if (curIdx > targetIdx) return 'completed';
		if (curIdx === targetIdx) return 'current';
		return 'upcoming';
	};
</script>

<svelte:head>
	<title>Lacak Order - GO LAUNDRY</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-2xl flex-col gap-6">
	<div
		class="relative flex items-center justify-between overflow-hidden rounded-3xl bg-blue-600 p-6 text-white shadow-md"
	>
		<div class="absolute -top-5 -right-5 text-7xl opacity-20">🛵</div>
		<div class="relative z-10">
			<div class="mb-1 text-xs font-bold tracking-widest text-blue-200 uppercase">Status Order</div>
			<h1 class="text-2xl font-black">{order.status.replace(/_/g, ' ')}</h1>
		</div>
		<div class="relative z-10 text-right">
			<div class="mb-1 text-xs font-bold text-blue-200">Order #</div>
			<div class="font-mono text-lg font-bold">{order.orderNumber}</div>
		</div>
	</div>

	{#if order.courier}
		<div
			class="flex items-center justify-between rounded-3xl border border-surface-200 bg-white p-6 shadow-sm"
		>
			<div class="flex items-center gap-4">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white bg-surface-100 text-2xl shadow-md"
				>
					🧑‍✈️
				</div>
				<div>
					<div class="mb-1 text-xs font-bold tracking-widest text-surface-400 uppercase">
						Kurir Anda
					</div>
					<h3 class="text-lg font-bold text-surface-900">{order.courier.name}</h3>
					<div class="mt-0.5 flex items-center gap-2 text-sm text-surface-500">
						<span class="rounded bg-surface-100 px-2 py-0.5 text-xs font-bold text-surface-700">
							{order.courier.courierProfile?.vehicleType?.replace('_', ' ') ||
								order.vehicleType.replace('_', ' ')}
						</span>
						<span>⭐ 4.9</span>
					</div>
				</div>
			</div>
			<a
				href="tel:{order.courier.phone}"
				class="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600 transition-colors hover:bg-green-100"
			>
				📞
			</a>
		</div>
	{:else if order.status === 'AVAILABLE'}
		<div
			class="flex animate-pulse items-center gap-4 rounded-3xl border border-blue-200 bg-blue-50 p-6"
		>
			<div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-200 text-xl">
				⏳
			</div>
			<div>
				<h3 class="font-bold text-blue-900">Mencari Kurir</h3>
				<p class="text-sm text-blue-700">Order Anda sedang ditawarkan ke kurir di sekitar Anda.</p>
			</div>
		</div>
	{/if}

	<!-- Timeline -->
	<div class="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm">
		<h3 class="mb-6 font-bold text-surface-900">Tracking Perjalanan</h3>

		<div class="relative ml-3 space-y-8 border-l-2 border-surface-100">
			<!-- AVAILABLE -->
			<div class="relative pl-6">
				<div
					class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
          {getStepStatus(order.status, 'AVAILABLE') === 'completed'
						? 'border-blue-500 bg-blue-500'
						: getStepStatus(order.status, 'AVAILABLE') === 'current'
							? 'border-blue-500 bg-white ring-4 ring-blue-50'
							: 'border-surface-300 bg-white'}"
				></div>
				<h4
					class="text-sm font-bold {getStepStatus(order.status, 'AVAILABLE') !== 'upcoming'
						? 'text-surface-900'
						: 'text-surface-400'}"
				>
					Order Dibuat
				</h4>
				<p class="mt-1 text-xs text-surface-500">Mencari kurir terdekat</p>
			</div>

			<!-- ASSIGNED -->
			<div class="relative pl-6">
				<div
					class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
          {getStepStatus(order.status, 'ASSIGNED') === 'completed'
						? 'border-blue-500 bg-blue-500'
						: getStepStatus(order.status, 'ASSIGNED') === 'current'
							? 'border-blue-500 bg-white ring-4 ring-blue-50'
							: 'border-surface-300 bg-white'}"
				></div>
				<h4
					class="text-sm font-bold {getStepStatus(order.status, 'ASSIGNED') !== 'upcoming'
						? 'text-surface-900'
						: 'text-surface-400'}"
				>
					Kurir Ditemukan
				</h4>
				<p class="mt-1 text-xs text-surface-500">Kurir menerima pesanan Anda</p>
			</div>

			<!-- HEADING_TO_PICKUP -->
			<div class="relative pl-6">
				<div
					class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
          {getStepStatus(order.status, 'HEADING_TO_PICKUP') === 'completed'
						? 'border-blue-500 bg-blue-500'
						: getStepStatus(order.status, 'HEADING_TO_PICKUP') === 'current'
							? 'border-blue-500 bg-white ring-4 ring-blue-50'
							: 'border-surface-300 bg-white'}"
				></div>
				<h4
					class="text-sm font-bold {getStepStatus(order.status, 'HEADING_TO_PICKUP') !== 'upcoming'
						? 'text-surface-900'
						: 'text-surface-400'}"
				>
					Menuju Lokasi Pickup
				</h4>
				<p class="mt-1 text-xs text-surface-500">Kurir sedang menuju alamat Anda</p>
			</div>

			<!-- PICKED_UP -->
			<div class="relative pl-6">
				<div
					class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
          {getStepStatus(order.status, 'PICKED_UP') === 'completed'
						? 'border-blue-500 bg-blue-500'
						: getStepStatus(order.status, 'PICKED_UP') === 'current'
							? 'border-blue-500 bg-white ring-4 ring-blue-50'
							: 'border-surface-300 bg-white'}"
				></div>
				<h4
					class="text-sm font-bold {getStepStatus(order.status, 'PICKED_UP') !== 'upcoming'
						? 'text-surface-900'
						: 'text-surface-400'}"
				>
					Laundry Diambil
				</h4>
				<p class="mt-1 text-xs text-surface-500">Laundry sudah berada di tangan kurir</p>
			</div>

			<!-- ON_DELIVERY -->
			<div class="relative pl-6">
				<div
					class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
          {getStepStatus(order.status, 'ON_DELIVERY') === 'completed'
						? 'border-blue-500 bg-blue-500'
						: getStepStatus(order.status, 'ON_DELIVERY') === 'current'
							? 'border-blue-500 bg-white ring-4 ring-blue-50'
							: 'border-surface-300 bg-white'}"
				></div>
				<h4
					class="text-sm font-bold {getStepStatus(order.status, 'ON_DELIVERY') !== 'upcoming'
						? 'text-surface-900'
						: 'text-surface-400'}"
				>
					Dalam Perjalanan
				</h4>
				<p class="mt-1 text-xs text-surface-500">Kurir menuju tujuan pengantaran</p>
			</div>

			<!-- COMPLETED -->
			<div class="relative pl-6">
				<div
					class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
          {getStepStatus(order.status, 'COMPLETED') === 'completed'
						? 'border-green-500 bg-green-500'
						: getStepStatus(order.status, 'COMPLETED') === 'current'
							? 'border-green-500 bg-green-500 ring-4 ring-green-50'
							: 'border-surface-300 bg-white'}"
				></div>
				<h4
					class="text-sm font-bold {getStepStatus(order.status, 'COMPLETED') !== 'upcoming'
						? 'text-green-600'
						: 'text-surface-400'}"
				>
					Selesai
				</h4>
				<p class="mt-1 text-xs text-surface-500">Order Go Laundry telah selesai</p>
			</div>
		</div>
	</div>

	<div class="mt-4 flex justify-center">
		<a
			href="/dashboard"
			class="text-sm font-bold text-surface-500 transition-colors hover:text-surface-800"
		>
			&larr; Kembali ke Dashboard
		</a>
	</div>
</div>
