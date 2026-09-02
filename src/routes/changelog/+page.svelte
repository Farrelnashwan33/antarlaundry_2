<svelte:head>
	<title>Changelog - Antar Laundry</title>
</svelte:head>

<section class="min-h-[70vh] bg-surface-50 py-24">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<h1 class="mb-12 text-center text-4xl font-bold text-surface-900 md:text-5xl">
			Catatan Pembaruan (Changelog)
		</h1>

		<div
			class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-transparent before:via-surface-200 before:to-transparent md:before:mx-auto md:before:translate-x-0"
		>
			<!-- Version 2.0 -->
			<div
				class="group is-active relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
			>
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-primary text-white shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
				>
					🚀
				</div>
				<div
					class="w-[calc(100%-4rem)] rounded-2xl border border-surface-200 bg-white p-6 shadow-sm md:w-[calc(50%-2.5rem)]"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-lg font-bold text-surface-900">Versi 2.0 - Perombakan Sistem</h3>
						<span class="rounded bg-surface-100 px-2 py-1 text-xs text-surface-500"
							>Agustus 2026</span
						>
					</div>
					<ul class="list-inside list-disc space-y-1 text-sm text-surface-600">
						<li>Kalkulasi total harga & diskon yang lebih akurat.</li>
						<li>Keamanan ganda (CSP, HSTS) & batas login (rate limiter).</li>
						<li>Status pesanan & pembayaran sinkron otomatis via aplikasi Kurir.</li>
						<li>Desain UI baru yang responsif & menawan.</li>
					</ul>
				</div>
			</div>

			<!-- Version 1.0 -->
			<div
				class="group relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse"
			>
				<div
					class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white bg-surface-200 text-surface-500 shadow md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"
				>
					🎉
				</div>
				<div
					class="w-[calc(100%-4rem)] rounded-2xl border border-surface-200 bg-white p-6 shadow-sm md:w-[calc(50%-2.5rem)]"
				>
					<div class="mb-2 flex items-center justify-between">
						<h3 class="text-lg font-bold text-surface-900">
							Versi 1.0 - Peluncuran Publik perdana
						</h3>
						<span class="rounded bg-surface-100 px-2 py-1 text-xs text-surface-500">Juni 2026</span>
					</div>
					<ul class="list-inside list-disc space-y-1 text-sm text-surface-600">
						<li>Sistem pemesanan & registrasi pelanggan perdana.</li>
						<li>Dashboard admin sederhana.</li>
						<li>Layanan dasar: Cuci Komplit, Kering, Setrika.</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</section>
