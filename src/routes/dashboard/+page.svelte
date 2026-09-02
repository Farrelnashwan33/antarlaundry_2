<script lang="ts">
	import { page } from '$app/stores';

	let { data } = $props();
	// We use data.user and data.profile from layout.server.ts via $page.data or data
	let profile = $derived($page.data.profile);
	let activeOrders = $derived(data.activeOrders);
	let currentOrder = $derived(activeOrders?.[0] || null);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};

	const menuCepat = [
		{
			title: 'GO LAUNDRY',
			desc: 'Antar-Jemput Cepat',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z',
			bg: 'bg-blue-600',
			text: 'text-white',
			link: '/dashboard/golaundry/new'
		},
		{
			title: 'Buat Pesanan',
			desc: 'Buat laundry baru',
			icon: 'M12 4v16m8-8H4',
			bg: 'bg-blue-50',
			text: 'text-blue-600',
			link: '/dashboard/order/new'
		},
		{
			title: 'Pesanan Saya',
			desc: 'Lihat semua pesanan',
			icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
			bg: 'bg-green-50',
			text: 'text-green-600',
			link: '/dashboard/orders'
		},
		{
			title: 'Promo & Voucher',
			desc: 'Dapatkan diskon',
			icon: 'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z',
			bg: 'bg-orange-50',
			text: 'text-orange-500',
			link: '/dashboard/promo'
		}
	];

	const getStepStatus = (order: any, step: string) => {
		if (!order) return 'upcoming';
		const s = order.orderStatus;
		const p = order.paymentStatus;

		let currentStepIdx = 0; // Pesanan Dibuat

		// Step 1: Pesanan Dibuat (always true if order exists)
		if (s === 'PENDING' && p === 'UNPAID') currentStepIdx = 1; // Menunggu Pembayaran

		if (p === 'PAID') {
			currentStepIdx = 2; // Pembayaran Berhasil, menunggu diproses
			if (['PICKUP', 'PROCESSING', 'WASHING', 'DRYING', 'IRONING'].includes(s)) currentStepIdx = 3; // Dalam Proses
			if (s === 'READY') currentStepIdx = 4; // Laundry Selesai
			if (['DELIVERY', 'COMPLETED'].includes(s)) currentStepIdx = 5; // Selesai
		}

		let targetIdx = 0;
		if (step === 'Pesanan Dibuat') targetIdx = 0;
		if (step === 'Menunggu Pembayaran') targetIdx = 1;
		if (step === 'Pembayaran Berhasil') targetIdx = 2;
		if (step === 'Dalam Proses') targetIdx = 3;
		if (step === 'Laundry Selesai') targetIdx = 4;
		if (step === 'Selesai') targetIdx = 5;

		if (currentStepIdx > targetIdx) return 'completed';
		if (currentStepIdx === targetIdx) return 'current';
		return 'upcoming';
	};
</script>

<svelte:head>
	<title>Dashboard - Antar Laundry</title>
</svelte:head>

<!-- Timeline Snippet -->
{#snippet timeline()}
	<div>
		<div class="mb-6 flex items-center justify-between">
			<h3 class="font-bold text-surface-900">Status Pesanan Aktif</h3>
			{#if currentOrder}
				<span class="font-mono text-xs text-surface-400"
					>#{currentOrder.orderNumber.split('-')[1]}</span
				>
			{/if}
		</div>

		{#if !currentOrder}
			<div class="py-6 text-center text-sm text-surface-400">Tidak ada pesanan aktif.</div>
		{:else}
			{@const step1 = getStepStatus(currentOrder, 'Pesanan Dibuat')}
			{@const step2 = getStepStatus(currentOrder, 'Menunggu Pembayaran')}
			{@const step3 = getStepStatus(currentOrder, 'Dalam Proses')}
			{@const step4 = getStepStatus(currentOrder, 'Laundry Selesai')}
			{@const step5 = getStepStatus(currentOrder, 'Selesai')}
			<div class="relative mt-4 ml-3 space-y-8 border-l-2 border-surface-200">
				<!-- Step 1 -->
				<div class="relative pl-6">
					<div
						class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 {step1 === 'completed'
							? 'border-green-500 bg-green-500'
							: step1 === 'current'
								? 'border-blue-500 bg-blue-500 ring-4 ring-blue-100'
								: 'border-surface-300 bg-white'}"
					></div>
					<h4
						class="text-sm font-bold {step1 !== 'upcoming'
							? 'text-surface-900'
							: 'text-surface-400'}"
					>
						Pesanan Dibuat
					</h4>
					<p class="mt-1 text-xs text-surface-500">
						{new Date(currentOrder.createdAt).toLocaleDateString('id-ID')}
						{new Date(currentOrder.createdAt).toLocaleTimeString('id-ID', {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</p>
				</div>

				<!-- Step 2 -->
				<div class="relative pl-6">
					<div
						class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 {step2 === 'completed'
							? 'border-green-500 bg-green-500'
							: step2 === 'current'
								? 'border-blue-500 bg-blue-500 ring-4 ring-blue-100'
								: 'border-surface-300 bg-white'}"
					></div>
					<h4
						class="text-sm font-bold {step2 !== 'upcoming'
							? 'text-surface-900'
							: 'text-surface-400'}"
					>
						Menunggu Pembayaran
					</h4>
					{#if step2 !== 'upcoming'}
						<p class="mt-1 text-xs text-surface-500">
							{currentOrder.paymentStatus === 'PAID'
								? 'Pembayaran berhasil'
								: 'Silakan lakukan pembayaran'}
						</p>
					{/if}
				</div>

				<!-- Step 3 -->
				<div class="relative pl-6">
					<div
						class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 {step3 === 'completed'
							? 'border-green-500 bg-green-500'
							: step3 === 'current'
								? 'border-blue-500 bg-blue-500 ring-4 ring-blue-100'
								: 'border-surface-300 bg-white'}"
					></div>
					<h4
						class="text-sm font-bold {step3 !== 'upcoming'
							? 'text-surface-900'
							: 'text-surface-400'}"
					>
						Dalam Proses
					</h4>
					{#if step3 !== 'upcoming'}
						<p class="mt-1 text-xs text-surface-500">Sedang dikerjakan oleh tim kami</p>
					{/if}
				</div>

				<!-- Step 4 -->
				<div class="relative pl-6">
					<div
						class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 {step4 === 'completed'
							? 'border-green-500 bg-green-500'
							: step4 === 'current'
								? 'border-blue-500 bg-blue-500 ring-4 ring-blue-100'
								: 'border-surface-300 bg-white'}"
					></div>
					<h4
						class="text-sm font-bold {step4 !== 'upcoming'
							? 'text-surface-900'
							: 'text-surface-400'}"
					>
						Laundry Selesai
					</h4>
					<p class="mt-1 text-xs text-surface-500">
						{step4 !== 'upcoming' ? 'Pakaian sudah bersih & rapi' : 'Menunggu antrian'}
					</p>
				</div>

				<!-- Step 5 -->
				<div class="relative pl-6">
					<div
						class="absolute top-1 -left-[9px] h-4 w-4 rounded-full border-2 {step5 === 'completed'
							? 'border-green-500 bg-green-500'
							: step5 === 'current'
								? 'border-blue-500 bg-blue-500 ring-4 ring-blue-100'
								: 'border-surface-300 bg-white'}"
					></div>
					<h4
						class="text-sm font-bold {step5 !== 'upcoming'
							? 'text-surface-900'
							: 'text-surface-400'}"
					>
						Selesai
					</h4>
					<p class="mt-1 text-xs text-surface-500">Pesanan diterima / diantar</p>
				</div>
			</div>

			<!-- Estimate Info -->
			<div class="mt-8 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
				</div>
				<div>
					<span class="mb-0.5 block text-xs text-surface-500">Estimasi Selesai</span>
					<span class="text-sm font-bold text-blue-700">Hari ini, 17:00 - 18:00</span>
				</div>
			</div>
		{/if}
	</div>
{/snippet}

<div class="flex min-h-full flex-col lg:flex-row">
	<!-- Main Content Column -->
	<div class="flex-1 border-r border-surface-200 p-6 lg:p-10">
		<!-- Header -->
		<div class="mb-10 flex items-center justify-between">
			<div>
				<h1 class="text-3xl font-extrabold tracking-tight text-surface-900">Dashboard</h1>
				<p class="mt-1 text-surface-500">
					Selamat datang kembali, <span class="font-bold text-blue-600">{profile?.name}</span>! 👋
				</p>
			</div>
			<div class="flex items-center gap-4">
				<button
					class="relative rounded-full border border-surface-200 bg-white p-2 text-surface-400 shadow-sm transition-colors hover:text-surface-600"
					aria-label="Notifications"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
						></path></svg
					>
					<span class="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-red-500"
					></span>
				</button>
			</div>
		</div>

		<!-- Stats Cards -->
		<div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div
				class="flex items-center justify-between rounded-3xl border border-surface-200 bg-white p-6 shadow-sm"
			>
				<div>
					<div class="mb-2 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
								></path></svg
							>
						</div>
						<span class="text-sm font-semibold text-surface-500">Pesanan Aktif</span>
					</div>
					<div class="mb-2 text-4xl font-black text-blue-600">{activeOrders?.length || 0}</div>
					<a href="/dashboard/orders" class="text-xs font-bold text-blue-600 hover:underline"
						>Lihat detail &rarr;</a
					>
				</div>
			</div>

			<div
				class="flex items-center justify-between rounded-3xl border border-surface-200 bg-white p-6 shadow-sm"
			>
				<div>
					<div class="mb-2 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path></svg
							>
						</div>
						<span class="text-sm font-semibold text-surface-500">Total Transaksi</span>
					</div>
					<div
						class="mb-2 max-w-[140px] truncate text-3xl font-black text-surface-900"
						title={formatCurrency(data.totalSpent || 0)}
					>
						{formatCurrency(data.totalSpent || 0)}
					</div>
					<a href="/dashboard/history" class="text-xs font-bold text-green-600 hover:underline"
						>Lihat riwayat &rarr;</a
					>
				</div>
			</div>

			<div
				class="flex items-center justify-between rounded-3xl border border-surface-200 bg-white p-6 shadow-sm"
			>
				<div>
					<div class="mb-2 flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600"
						>
							<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
								></path></svg
							>
						</div>
						<span class="text-sm font-semibold text-surface-500">Status Akun</span>
					</div>
					<div class="mb-2 flex items-center gap-2">
						<div class="h-3 w-3 animate-pulse rounded-full bg-green-500"></div>
						<span class="text-2xl font-black text-green-600">Aktif</span>
					</div>
					<span class="text-xs font-medium text-surface-400">Akun terverifikasi</span>
				</div>
			</div>
		</div>

		<!-- Wallet Widget -->
		<div
			class="relative mb-10 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-blue-600 p-6 text-white shadow-lg md:flex-row lg:p-8"
		>
			<div
				class="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white opacity-10 blur-2xl"
			></div>
			<div
				class="absolute right-20 bottom-0 h-24 w-24 rounded-full bg-blue-400 opacity-20 blur-xl"
			></div>
			<div class="relative z-10 flex w-full items-center gap-6 md:w-auto">
				<div
					class="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm"
				>
					<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
						></path></svg
					>
				</div>
				<div>
					<p class="text-sm font-medium text-blue-100">Saldo Saya</p>
					<h2 class="mt-1 text-3xl font-black">{formatCurrency(data.wallet?.balance || 0)}</h2>
				</div>
			</div>
			<a
				href="/dashboard/wallet"
				class="relative z-10 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-600 shadow-sm transition-colors hover:bg-blue-50 md:w-auto"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 6v6m0 0v6m0-6h6m-6 0H6"
					></path></svg
				>
				Top Up Saldo
			</a>
		</div>

		<!-- Active Orders Box -->
		<div class="mb-10">
			<div class="mb-6 flex items-center justify-between">
				<h2 class="text-xl font-bold text-surface-900">Pesanan Anda</h2>
				<a href="/dashboard/orders" class="text-sm font-bold text-blue-600 hover:underline"
					>Lihat Semua &rarr;</a
				>
			</div>

			<div class="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm">
				{#if activeOrders?.length === 0}
					<div class="py-8 text-center">
						<div class="mb-4 text-5xl opacity-50">👕</div>
						<h3 class="mb-2 font-bold text-surface-900">Belum ada pesanan aktif</h3>
						<p class="mb-6 text-sm text-surface-500">Cucian kotor menumpuk? Biar kami yang urus!</p>
						<a
							href="/dashboard/order/new"
							class="inline-block rounded-xl bg-blue-600 px-6 py-2.5 font-bold text-white shadow-md shadow-blue-500/20 transition-colors hover:bg-blue-700"
							>Buat Pesanan Sekarang</a
						>
					</div>
				{:else}
					{#each activeOrders as order}
						<div
							class="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-surface-100 bg-surface-50 p-4 transition-colors last:mb-0 hover:border-surface-200 hover:bg-white"
						>
							<div class="flex items-center gap-5">
								<div
									class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600"
								>
									<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
										></path></svg
									>
								</div>
								<div class="min-w-0">
									<div class="mb-1 flex items-center gap-3">
										<span class="font-mono text-xs text-surface-400"
											>#{order.orderNumber.split('-')[1]}</span
										>
										<span
											class="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase whitespace-nowrap"
											>{order.orderStatus}</span
										>
									</div>
									<h3 class="truncate text-lg font-bold text-surface-900">
										{order.items[0]?.service?.name || 'Laundry Kiloan'}
									</h3>
									<p class="mt-1 truncate text-sm text-surface-500">
										{new Date(order.createdAt).toLocaleDateString('id-ID')} &bull; {order.items[0]
											?.weight || 0} Kg &bull; Reguler
									</p>
								</div>
							</div>
							<div class="flex flex-col items-start md:items-end gap-3 text-left md:text-right w-full md:w-auto mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-0 border-surface-200">
								<span class="text-xl font-extrabold text-blue-600"
									>{formatCurrency(order.total || order.subtotal || 0)}</span
								>
								<div class="flex flex-wrap gap-2 w-full md:w-auto">
									{#if order.orderStatus === 'PENDING'}
										<form method="POST" action="/dashboard/orders?/cancelOrder">
											<input type="hidden" name="orderId" value={order.id} />
											<button
												type="submit"
												class="rounded-lg border border-red-200 bg-red-50 px-4 py-1.5 text-xs font-bold text-red-600 transition-colors hover:bg-red-100"
												onclick={(e) => { if (!confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')) e.preventDefault(); }}
											>
												Batalkan
											</button>
										</form>
									{/if}
									{#if order.paymentStatus === 'UNPAID' && (order.total > 0 || order.subtotal > 0)}
										<form method="POST" action="/dashboard/orders?/payOrder">
											<input type="hidden" name="orderId" value={order.id} />
											<button
												type="submit"
												class="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-blue-700"
											>
												Bayar
											</button>
										</form>
									{/if}
									<a
										href="/dashboard/orders"
										class="rounded-lg border border-blue-200 px-4 py-1.5 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-50"
										>Lihat Detail</a
									>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Mobile-only Timeline -->
		<div class="mb-10 block rounded-3xl border border-surface-200 bg-white p-6 shadow-sm lg:hidden">
			{@render timeline()}
		</div>

		<!-- Quick Menu -->
		<div class="mb-10">
			<h2 class="mb-6 text-xl font-bold text-surface-900">Menu Cepat</h2>
			<div class="grid grid-cols-2 gap-4 md:grid-cols-4">
				{#each menuCepat as menu}
					<a
						href={menu.link}
						class="group flex flex-col items-center rounded-3xl border border-surface-200 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:shadow-md"
					>
						<div
							class={`h-12 w-12 rounded-2xl ${menu.bg} ${menu.text} mb-3 flex items-center justify-center transition-transform group-hover:scale-110`}
						>
							<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
								><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={menu.icon}
								></path></svg
							>
						</div>
						<h4 class="text-sm font-bold text-surface-900">{menu.title}</h4>
						<p class="mt-1 text-[10px] text-surface-500">{menu.desc}</p>
					</a>
				{/each}
			</div>
		</div>

		<!-- Info Banner -->
		<div class="rounded-3xl border border-surface-200 bg-surface-50 p-6">
			<h3 class="mb-4 font-bold text-surface-900">Kenapa pilih AntarLaundry?</h3>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
				<div class="flex items-start gap-3">
					<svg
						class="h-6 w-6 flex-shrink-0 text-blue-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						></path></svg
					>
					<div>
						<h4 class="text-sm font-bold text-surface-900">Gratis Antar Jemput</h4>
						<p class="mt-1 text-xs text-surface-500">Tanpa biaya tambahan</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<svg
						class="h-6 w-6 flex-shrink-0 text-blue-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
						></path></svg
					>
					<div>
						<h4 class="text-sm font-bold text-surface-900">Bersih & Wangi</h4>
						<p class="mt-1 text-xs text-surface-500">Kualitas terbaik</p>
					</div>
				</div>
				<div class="flex items-start gap-3">
					<svg
						class="h-6 w-6 flex-shrink-0 text-blue-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
					<div>
						<h4 class="text-sm font-bold text-surface-900">Cepat & Tepat</h4>
						<p class="mt-1 text-xs text-surface-500">Sesuai estimasi waktu</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Right Sidebar / Panel -->
	<div class="flex h-full w-full flex-col gap-8 bg-white p-6 lg:w-80 lg:p-8">
		<!-- Timeline (Desktop Only) -->
		<div class="hidden lg:block">
			{@render timeline()}
		</div>

		<!-- Promo Banner (Dynamic, set by admin) -->
		{#if data.activePromo}
			<div class="mt-auto pt-8">
				<div
					class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-white shadow-lg shadow-blue-500/30"
				>
					<div
						class="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white opacity-10 blur-xl"
					></div>
					<div
						class="absolute right-0 bottom-0 h-24 w-24 rounded-full bg-blue-400 opacity-20 blur-lg"
					></div>

					<span class="mb-1 block text-xs font-semibold text-blue-100">Promo Spesial</span>
					<h3 class="mb-2 text-2xl font-black">{data.activePromo.code}</h3>
					<p class="mb-6 max-w-[140px] text-sm text-blue-100">{data.activePromo.description}</p>

					<a
						href="/dashboard/promo"
						class="inline-block rounded-xl bg-white px-4 py-2 text-xs font-bold text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
					>
						Gunakan Sekarang
					</a>

					<div class="absolute -right-4 -bottom-2 text-7xl opacity-90 drop-shadow-lg">🎁</div>
				</div>
			</div>
		{/if}
	</div>
</div>
