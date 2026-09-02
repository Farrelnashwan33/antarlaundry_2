<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let availableOrders = $derived(data.availableOrders);
	let profile = $derived(data.profile);
</script>

<svelte:head>
	<title>Order Tersedia - GO LAUNDRY</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-4xl flex-col gap-6">
	<!-- Header -->
	<div
		class="flex items-center justify-between rounded-2xl border border-surface-100 bg-white p-4 shadow-sm"
	>
		<div class="flex items-center gap-3">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600"
			>
				🛵
			</div>
			<div>
				<h1 class="leading-tight font-bold text-surface-900">Order Tersedia</h1>
				<p class="text-xs text-surface-500">Ambil order Go Laundry di sekitar Anda</p>
			</div>
		</div>
		<a
			href="/courier"
			class="rounded-lg border border-surface-200 bg-surface-50 px-3 py-1.5 text-xs font-bold text-surface-500 hover:text-surface-700"
		>
			Kembali
		</a>
	</div>

	{#if !profile?.isOnline}
		<div
			class="flex flex-col justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 md:flex-row md:items-center"
		>
			<div class="flex gap-3">
				<div>⚠️</div>
				<div>
					<span class="font-bold">Anda sedang offline.</span>
					Aktifkan status Anda untuk mulai menerima dan mengambil order Go Laundry.
				</div>
			</div>
			<form method="POST" action="?/toggleOnline" use:enhance>
				<button
					type="submit"
					class="rounded-lg bg-amber-600 px-4 py-2 font-bold whitespace-nowrap text-white transition-colors hover:bg-amber-700"
				>
					Aktifkan Sekarang
				</button>
			</form>
		</div>
	{/if}

	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each availableOrders as order}
			<div
				class="group relative flex flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white p-5 shadow-sm transition-colors hover:border-blue-300"
			>
				<!-- Accent bar -->
				<div class="absolute top-0 bottom-0 left-0 w-1 rounded-l-2xl bg-blue-500"></div>

				<div class="mb-4 flex items-start justify-between">
					<div>
						<span class="font-mono text-xs font-bold text-surface-400">{order.orderNumber}</span>
						<div class="mt-1 flex gap-2">
							<span
								class="rounded-md border border-blue-100 bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-600 uppercase"
							>
								{order.serviceType.replace(/_/g, ' ')}
							</span>
							<span
								class="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase"
							>
								{order.vehicleType === 'MOTOR'
									? '🛵'
									: order.vehicleType === 'MOTOR_BOX'
										? '🛺'
										: '🚗'}
								{order.vehicleType.replace('_', ' ')}
							</span>
						</div>
					</div>
					<div class="text-right">
						<span class="mb-0.5 block text-[10px] text-surface-500">Penghasilan</span>
						<span class="text-lg font-black text-green-600"
							>Rp{order.courierEarning.toLocaleString('id-ID')}</span
						>
					</div>
				</div>

				<div class="mb-5 flex flex-col gap-3">
					<div class="flex items-start gap-3">
						<div class="mt-0.5 flex w-5 justify-center text-surface-300">📍</div>
						<div>
							<div class="mb-0.5 text-[10px] font-bold tracking-wider text-surface-500 uppercase">
								Pickup
							</div>
							<div class="text-sm leading-snug font-medium text-surface-900">
								{order.pickupAddress}
							</div>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="mt-0.5 flex w-5 justify-center text-blue-500">🏁</div>
						<div>
							<div class="mb-0.5 text-[10px] font-bold tracking-wider text-surface-500 uppercase">
								Tujuan
							</div>
							<div class="text-sm leading-snug font-medium text-surface-900">
								{order.destinationAddress}
							</div>
						</div>
					</div>
				</div>

				<div class="mt-auto flex items-center justify-between border-t border-surface-100 pt-4">
					<div class="flex items-center gap-2 text-xs font-medium text-surface-500">
						<span>👕 ± {order.estimatedWeight || 0} KG</span>
					</div>

					<form method="POST" action="?/claimOrder" use:enhance>
						<input type="hidden" name="orderId" value={order.id} />
						<button
							type="submit"
							class="rounded-xl bg-blue-600 px-6 py-2 text-sm font-bold text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
						>
							AMBIL ORDER
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>

	{#if availableOrders.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-3xl border border-surface-100 bg-white p-12 text-center shadow-sm"
		>
			<div class="mb-4 text-6xl opacity-50">☕</div>
			<h3 class="mb-2 text-lg font-bold text-surface-900">Belum ada order</h3>
			<p class="max-w-sm text-sm text-surface-500">
				Order baru akan muncul di sini. Silakan istirahat sejenak sambil menunggu order Go Laundry
				berikutnya.
			</p>

			<button
				onclick={() => window.location.reload()}
				class="mt-6 flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-600 transition-colors hover:bg-blue-100"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
					></path></svg
				>
				Muat Ulang
			</button>
		</div>
	{/if}
</div>
