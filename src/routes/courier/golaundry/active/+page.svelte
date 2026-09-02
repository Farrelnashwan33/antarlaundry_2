<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let activeOrders = $derived(data.activeOrders);
</script>

<svelte:head>
	<title>Order Aktif - GO LAUNDRY</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-2xl flex-col gap-6">
	<!-- Header -->
	<div
		class="flex items-center justify-between rounded-2xl border border-surface-100 bg-white p-4 shadow-sm"
	>
		<div class="flex items-center gap-3">
			<div
				class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl text-blue-600"
			>
				🚚
			</div>
			<div>
				<h1 class="leading-tight font-bold text-surface-900">Order Aktif Anda</h1>
				<p class="text-xs text-surface-500">Selesaikan order tepat waktu</p>
			</div>
		</div>
		<a
			href="/courier"
			class="rounded-lg border border-surface-200 bg-surface-50 px-3 py-1.5 text-xs font-bold text-surface-500 hover:text-surface-700"
		>
			Kembali
		</a>
	</div>

	{#if activeOrders.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-3xl border border-surface-100 bg-white p-12 text-center shadow-sm"
		>
			<div class="mb-4 text-6xl opacity-50">✨</div>
			<h3 class="mb-2 text-lg font-bold text-surface-900">Belum ada order yang berjalan</h3>
			<p class="mb-6 max-w-sm text-sm text-surface-500">
				Ambil order baru melalui halaman pool order.
			</p>

			<a
				href="/courier/golaundry/pool"
				class="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
			>
				Cari Order
			</a>
		</div>
	{:else}
		<div class="flex flex-col gap-4">
			{#each activeOrders as order}
				<div class="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm">
					<div class="mb-6 flex items-center justify-between">
						<div>
							<span class="mb-1 block font-mono text-xs font-bold text-surface-400"
								>ORDER {order.orderNumber}</span
							>
							<div
								class="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wide text-blue-700"
							>
								<span class="h-2 w-2 animate-pulse rounded-full bg-blue-500"></span>
								{order.status.replace(/_/g, ' ')}
							</div>
						</div>
						<div class="text-right">
							<span
								class="mb-1 block text-[10px] font-bold tracking-widest text-surface-400 uppercase"
								>Penghasilan</span
							>
							<span class="text-xl font-black text-green-600"
								>Rp{order.courierEarning.toLocaleString('id-ID')}</span
							>
						</div>
					</div>

					<div class="relative mt-2 mb-8 ml-3 space-y-6 border-l-2 border-surface-100">
						<div class="relative pl-6">
							<div
								class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 border-green-500 bg-green-500 ring-4 ring-green-50"
							></div>
							<h4 class="text-sm font-bold text-surface-900">Order Diterima</h4>
							<p class="mt-0.5 text-[11px] text-surface-500">
								Anda menyetujui untuk mengambil order ini
							</p>
						</div>

						<!-- MENUJU PICKUP -->
						<div class="relative pl-6">
							<div
								class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
                {order.status !== 'ASSIGNED'
									? 'border-green-500 bg-green-500'
									: 'border-surface-300 bg-white'}"
							></div>
							<h4
								class="text-sm font-bold {order.status !== 'ASSIGNED'
									? 'text-surface-900'
									: 'text-surface-400'}"
							>
								Menuju Lokasi Pickup
							</h4>
							{#if order.status === 'ASSIGNED'}
								<form method="POST" action="?/updateStatus" use:enhance class="mt-2">
									<input type="hidden" name="orderId" value={order.id} />
									<input type="hidden" name="status" value="HEADING_TO_PICKUP" />
									<button
										type="submit"
										class="rounded-lg bg-surface-900 px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-surface-800"
									>
										Saya Sudah Jalan &rarr;
									</button>
								</form>
							{/if}
						</div>

						<!-- SUDAH DIAMBIL -->
						<div class="relative pl-6">
							<div
								class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
                {['PICKED_UP', 'ON_DELIVERY'].includes(order.status)
									? 'border-green-500 bg-green-500'
									: 'border-surface-300 bg-white'}"
							></div>
							<h4
								class="text-sm font-bold {['PICKED_UP', 'ON_DELIVERY'].includes(order.status)
									? 'text-surface-900'
									: 'text-surface-400'}"
							>
								Laundry Diambil
							</h4>
							<div
								class="mt-1 rounded border border-surface-100 bg-surface-50 p-2 text-[11px] font-medium text-surface-500"
							>
								<span class="mb-0.5 block tracking-wider text-surface-400 uppercase"
									>Lokasi Pickup</span
								>
								<span class="text-surface-900">{order.pickupAddress}</span>
							</div>
							{#if order.status === 'HEADING_TO_PICKUP'}
								<form method="POST" action="?/updateStatus" use:enhance class="mt-3">
									<input type="hidden" name="orderId" value={order.id} />
									<input type="hidden" name="status" value="PICKED_UP" />
									<button
										type="submit"
										class="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
									>
										Laundry Sudah Saya Ambil &rarr;
									</button>
								</form>
							{/if}
						</div>

						<!-- MULAI PENGANTARAN -->
						<div class="relative pl-6">
							<div
								class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2
                {order.status === 'ON_DELIVERY'
									? 'border-green-500 bg-green-500'
									: 'border-surface-300 bg-white'}"
							></div>
							<h4
								class="text-sm font-bold {order.status === 'ON_DELIVERY'
									? 'text-surface-900'
									: 'text-surface-400'}"
							>
								Dalam Perjalanan
							</h4>
							<div
								class="mt-1 rounded border border-blue-100 bg-blue-50/50 p-2 text-[11px] font-medium text-surface-500"
							>
								<span class="mb-0.5 block tracking-wider text-blue-400 uppercase"
									>Lokasi Tujuan</span
								>
								<span class="text-blue-900">{order.destinationAddress}</span>
							</div>
							{#if order.status === 'PICKED_UP'}
								<form method="POST" action="?/updateStatus" use:enhance class="mt-3">
									<input type="hidden" name="orderId" value={order.id} />
									<input type="hidden" name="status" value="ON_DELIVERY" />
									<button
										type="submit"
										class="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
									>
										Mulai Mengantar &rarr;
									</button>
								</form>
							{/if}
						</div>

						<!-- SELESAIKAN -->
						{#if order.status === 'ON_DELIVERY'}
							<div class="relative mt-6 border-t border-surface-100 pt-4 pl-6">
								<form method="POST" action="?/updateStatus" use:enhance class="w-full">
									<input type="hidden" name="orderId" value={order.id} />
									<input type="hidden" name="status" value="COMPLETED" />
									<button
										type="submit"
										class="w-full rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white shadow-sm shadow-green-500/30 transition-all hover:bg-green-700 active:scale-[0.98]"
									>
										Selesaikan Order
									</button>
								</form>
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
