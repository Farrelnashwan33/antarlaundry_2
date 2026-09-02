<svelte:head>
	<title>Keamanan - Antar Laundry</title>
</svelte:head>

<section class="min-h-[70vh] bg-surface-50 py-24">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="mb-8 text-4xl font-bold text-surface-900 md:text-5xl">Pusat Keamanan</h1>
		<div class="rounded-3xl bg-surface-900 p-8 text-left text-white shadow-sm md:p-12">
			<div
				class="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600"
			>
				🛡️
			</div>
			<h2 class="mb-4 text-2xl font-semibold">Kami Menjaga Akun Anda</h2>
			<p class="mb-8 leading-relaxed text-surface-300">
				Antar Laundry menggunakan infrastruktur keamanan berlapis untuk melindungi data pribadi dan
				pesanan Anda dari serangan siber.
			</p>

			<div class="space-y-4">
				<div class="rounded-xl border border-surface-700 bg-surface-800 p-4">
					<h3 class="mb-1 font-bold text-primary-400">Enkripsi End-to-End</h3>
					<p class="text-sm text-surface-400">
						Seluruh lalu lintas jaringan diamankan menggunakan protokol Transport Layer Security
						(TLS 1.3) yang kuat.
					</p>
				</div>
				<div class="rounded-xl border border-surface-700 bg-surface-800 p-4">
					<h3 class="mb-1 font-bold text-primary-400">Proteksi Keamanan Web Modern (CSP & HSTS)</h3>
					<p class="text-sm text-surface-400">
						Header keamanan tingkat lanjut diaktifkan untuk mencegah Cross-Site Scripting (XSS) dan
						pemalsuan data.
					</p>
				</div>
				<div class="rounded-xl border border-surface-700 bg-surface-800 p-4">
					<h3 class="mb-1 font-bold text-primary-400">Rate Limiting</h3>
					<p class="text-sm text-surface-400">
						Kami melindungi titik akhir otentikasi (login) dari serangan brute force dengan
						membatasi jumlah percobaan secara otomatis.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
