<svelte:head>
	<title>Referensi API - Antar Laundry</title>
</svelte:head>

<section class="min-h-[70vh] bg-surface-50 py-24">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="mb-8 text-4xl font-bold text-surface-900 md:text-5xl">Referensi API</h1>
		<div class="rounded-3xl bg-surface-900 p-8 text-left shadow-sm md:p-12">
			<h2 class="mb-4 text-2xl font-semibold text-white">AntarLaundry API v1 (BETA)</h2>
			<p class="mb-8 leading-relaxed text-surface-300">
				Untuk developer dan mitra korporat yang ingin mengintegrasikan layanan laundry B2B (seperti
				pembersihan seragam karyawan atau linen hotel) ke dalam sistem mereka sendiri.
			</p>

			<div class="overflow-x-auto rounded-xl bg-surface-800 p-4 font-mono text-sm text-surface-300">
				<p class="mb-2 text-primary-400">// Mendapatkan Estimasi Harga</p>
				<p><span class="text-pink-400">POST</span> /api/v1/estimate</p>
				<p class="mt-2 text-green-400">Body:</p>
				<pre><code
						>&#123;
  "serviceId": "CUCI_KOMPLIT",
  "weightKg": 15,
  "pickupLocation": &#123;
    "lat": -6.2088,
    "lng": 106.8456
  &#125;
&#125;</code
					></pre>
			</div>

			<div class="mt-8 text-center">
				<button
					class="rounded-xl bg-white px-6 py-3 font-medium text-surface-900 hover:bg-surface-100"
					>Minta Akses Kunci API</button
				>
			</div>
		</div>
	</div>
</section>
