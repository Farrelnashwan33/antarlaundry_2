<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Panduan Mitra - Antar Laundry</title>
</svelte:head>

<section class="min-h-[70vh] bg-surface-50 py-24">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="mb-8 text-4xl font-bold text-surface-900 md:text-5xl">Panduan Mitra & Vendor</h1>
		<div class="rounded-3xl border border-surface-200 bg-white p-8 text-left shadow-sm md:p-12">
			<h2 class="mb-4 text-2xl font-semibold text-primary">Cara Bergabung Menjadi Vendor Cuci</h2>
			<p class="mb-6 leading-relaxed text-surface-600">
				Apakah Anda pemilik usaha laundry (mesin cuci industri) dan ingin menjadi bagian dari rantai
				suplai Antar Laundry? Kami membuka kesempatan kemitraan (franchise/vendor) dengan standar
				kualitas tinggi.
			</p>

			{#if $page.url.searchParams.get('success') === 'true'}
				<div class="mb-8 rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
					<div
						class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600"
					>
						✅
					</div>
					<h3 class="mb-2 text-xl font-bold text-green-800">Pendaftaran Berhasil Terkirim!</h3>
					<p class="text-green-700">
						Terima kasih telah mendaftar. Tim kami akan segera meninjau aplikasi Anda dan
						menghubungi Anda.
					</p>
				</div>
			{/if}

			<div class="rounded-xl border border-primary-100 bg-primary-50 p-6">
				<h3 class="mb-2 font-bold text-primary-900">Persyaratan Kemitraan:</h3>
				<ul class="list-inside list-disc space-y-2 text-sm text-primary-800">
					<li>Memiliki minimal 5 set mesin cuci & pengering komersial.</li>
					<li>Area pengeringan indoor bebas debu.</li>
					<li>Kapasitas produksi minimal 100 Kg/hari.</li>
					<li>Bersedia mengikuti SOP deterjen yang kami sediakan.</li>
				</ul>
			</div>
			<div class="mt-8 text-center">
				<a
					href="/partners/apply"
					class="inline-block transform rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:-translate-y-1 hover:bg-primary-hover"
					>Daftar Menjadi Mitra</a
				>
			</div>
		</div>
	</div>
</section>
