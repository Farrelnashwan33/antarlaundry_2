<svelte:head>
	<title>Blog - Antar Laundry</title>
</svelte:head>

<section class="min-h-[70vh] bg-surface-50 py-24">
	<div class="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
		<h1 class="mb-12 text-center text-4xl font-bold text-surface-900 md:text-5xl">Blog & Tips</h1>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-3">
			<!-- Article 1 -->
			<article
				class="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-sm transition hover:shadow-md"
			>
				<div class="flex h-48 items-center justify-center bg-primary-100 text-primary-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"
						/></svg
					>
				</div>
				<div class="p-6">
					<span class="text-xs font-semibold tracking-wider text-primary-600 uppercase"
						>Tips Perawatan</span
					>
					<h3 class="mt-2 mb-3 text-xl font-bold text-surface-900">
						Cara Menghilangkan Noda Membandel di Kemeja Putih
					</h3>
					<p class="mb-4 line-clamp-3 text-sm text-surface-600">
						Pakaian putih sangat mudah kotor. Pelajari tips rahasia kami dalam menghilangkan noda
						tanpa merusak serat kain...
					</p>
					<a
						href="/blog/tips-noda-kemeja"
						class="inline-block text-sm font-medium text-primary-600 transition hover:text-primary-700"
						>Baca selengkapnya &rarr;</a
					>
				</div>
			</article>

			<!-- Article 2 -->
			<article
				class="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-sm transition hover:shadow-md"
			>
				<div class="flex h-48 items-center justify-center bg-blue-100 text-blue-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
						/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></svg
					>
				</div>
				<div class="p-6">
					<span class="text-xs font-semibold tracking-wider text-blue-600 uppercase">Berita</span>
					<h3 class="mt-2 mb-3 text-xl font-bold text-surface-900">
						Langkah Antar Laundry Menuju Layanan Ramah Lingkungan
					</h3>
					<p class="mb-4 line-clamp-3 text-sm text-surface-600">
						Kami baru saja beralih menggunakan deterjen bio-degradable yang aman untuk lingkungan
						dan kesehatan keluarga Anda...
					</p>
					<a
						href="/blog/layanan-ramah-lingkungan"
						class="inline-block text-sm font-medium text-primary-600 transition hover:text-primary-700"
						>Baca selengkapnya &rarr;</a
					>
				</div>
			</article>

			<!-- Article 3 -->
			<article
				class="overflow-hidden rounded-3xl border border-surface-200 bg-white shadow-sm transition hover:shadow-md"
			>
				<div class="flex h-48 items-center justify-center bg-surface-200 text-surface-600">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="64"
						height="64"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect width="14" height="20" x="5" y="2" rx="2" ry="2" /><path d="M12 18h.01" /></svg
					>
				</div>
				<div class="p-6">
					<span class="text-xs font-semibold tracking-wider text-surface-600 uppercase"
						>Pembaruan Sistem</span
					>
					<h3 class="mt-2 mb-3 text-xl font-bold text-surface-900">
						Fitur Lacak Kurir Real-Time Kini Tersedia
					</h3>
					<p class="mb-4 line-clamp-3 text-sm text-surface-600">
						Pelanggan kini tidak perlu lagi menebak-nebak kapan kurir akan tiba. Pantau semuanya
						langsung dari dashboard aplikasi...
					</p>
					<a
						href="/blog/lacak-kurir-realtime"
						class="inline-block text-sm font-medium text-primary-600 transition hover:text-primary-700"
						>Baca selengkapnya &rarr;</a
					>
				</div>
			</article>
		</div>
	</div>
</section>
