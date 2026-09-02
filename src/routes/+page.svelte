<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Badge from '$lib/components/ui/Badge.svelte';

	const services = [
		{
			title: 'Cuci Komplit',
			desc: 'Cuci, jemur, dan setrika rapi. Siap pakai!',
			price: 'Rp 7.000/kg',
			icon: '🧺'
		},
		{
			title: 'Cuci Kering',
			desc: 'Hanya cuci dan keringkan tanpa setrika.',
			price: 'Rp 5.000/kg',
			icon: '💨'
		},
		{
			title: 'Setrika Saja',
			desc: 'Pakaian kusut? Kami setrika hingga mulus.',
			price: 'Rp 5.000/kg',
			icon: '👔'
		},
		{
			title: 'Cuci Sepatu',
			desc: 'Sepatu kotor jadi seperti baru lagi.',
			price: 'Mulai Rp 25.000',
			icon: '👟'
		}
	];

	const steps = [
		{ num: '1', title: 'Pesan', desc: 'Pesan layanan via aplikasi dengan mudah.' },
		{ num: '2', title: 'Jemput', desc: 'Kurir kami akan menjemput pakaian kotor Anda.' },
		{ num: '3', title: 'Cuci', desc: 'Pakaian dicuci dengan hati-hati dan bersih.' },
		{ num: '4', title: 'Antar', desc: 'Pakaian bersih dan wangi diantar kembali.' }
	];
</script>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-primary-50 pt-24 pb-32">
	<div class="absolute inset-0 z-0">
		<!-- Decorative background elements -->
		<div
			class="animate-blob absolute top-20 left-10 h-72 w-72 rounded-full bg-primary-200 opacity-50 mix-blend-multiply blur-3xl filter"
		></div>
		<div
			class="animate-blob animation-delay-2000 absolute top-40 right-10 h-72 w-72 rounded-full bg-blue-200 opacity-50 mix-blend-multiply blur-3xl filter"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="fade-in mx-auto max-w-3xl text-center">
			<Badge variant="primary" class="mb-6">🚀 Layanan Antar Jemput Gratis!</Badge>
			<h1
				class="mb-6 text-5xl leading-tight font-extrabold tracking-tight text-surface-900 md:text-6xl"
			>
				Laundry Bersih, <br />
				<span class="bg-gradient-to-r from-primary-600 to-blue-500 bg-clip-text text-transparent">
					Tanpa Perlu Keluar Rumah
				</span>
			</h1>
			<p class="mx-auto mb-10 max-w-2xl text-xl text-surface-600">
				Antar Laundry siap menyelesaikan masalah cucian kotor Anda. Pesan sekarang, kurir kami
				jemput, dan pakaian kembali dalam keadaan bersih, wangi, dan rapi.
			</p>
			<div class="flex flex-col justify-center gap-4 sm:flex-row">
				<Button href="/register" size="lg" class="w-full sm:w-auto">Mulai Pesan Sekarang</Button>
				<Button href="#cara-kerja" variant="outline" size="lg" class="w-full sm:w-auto"
					>Pelajari Cara Kerja</Button
				>
			</div>
		</div>
	</div>
</section>

<!-- Layanan Section -->
<section id="layanan" class="bg-gradient-to-b from-white to-blue-50 py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-surface-900 md:text-4xl">Layanan Unggulan Kami</h2>
			<p class="mx-auto max-w-2xl text-lg text-surface-600">
				Pilih layanan yang sesuai dengan kebutuhan Anda. Kami menggunakan deterjen premium dan mesin
				berteknologi tinggi.
			</p>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each services as service}
				<Card hoverable padding="lg" class="text-center">
					<div
						class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary-100 bg-primary-50 text-3xl shadow-sm"
					>
						{service.icon}
					</div>
					<h3 class="mb-2 text-xl font-bold text-surface-900">{service.title}</h3>
					<p class="mb-4 h-12 text-surface-600">{service.desc}</p>
					<div
						class="inline-block rounded-lg bg-surface-50 px-4 py-2 font-semibold text-primary-700"
					>
						{service.price}
					</div>
				</Card>
			{/each}
		</div>
	</div>
</section>

<!-- Cara Kerja Section -->
<section id="cara-kerja" class="bg-blue-50 py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<h2 class="mb-4 text-3xl font-bold text-surface-900 md:text-4xl">Cara Kerja Antar Laundry</h2>
			<p class="mx-auto max-w-2xl text-lg text-surface-600">
				Cukup 4 langkah mudah untuk mendapatkan pakaian bersih tanpa repot.
			</p>
		</div>

		<div class="relative grid grid-cols-1 gap-8 md:grid-cols-4">
			<div
				class="absolute top-1/2 left-0 z-0 hidden h-0.5 w-full -translate-y-1/2 bg-surface-200 md:block"
			></div>

			{#each steps as step}
				<div class="relative z-10 text-center">
					<div
						class="hover-scale mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-surface-50 bg-primary text-2xl font-bold text-white shadow-lg shadow-primary-200"
					>
						{step.num}
					</div>
					<h3 class="mb-2 text-xl font-bold text-surface-900">{step.title}</h3>
					<p class="text-surface-600">{step.desc}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="relative overflow-hidden bg-surface-900 py-20">
	<div class="absolute inset-0 overflow-hidden">
		<div
			class="absolute -top-1/2 -right-1/4 h-full w-full rounded-full bg-gradient-to-b from-primary-600 to-transparent opacity-20 blur-3xl"
		></div>
	</div>
	<div class="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h2 class="mb-6 text-3xl font-bold text-white md:text-4xl">
			Siap Menikmati Kemudahan Laundry?
		</h2>
		<p class="mb-10 text-xl text-surface-300">
			Bergabunglah dengan ribuan pelanggan yang telah mempercayakan pakaian mereka kepada Antar
			Laundry.
		</p>
		<Button href="/register" size="lg" class="!bg-white !text-surface-900 hover:!bg-surface-50"
			>Daftar Sekarang</Button
		>
	</div>
</section>

<style>
	.animate-blob {
		animation: blob 7s infinite;
	}
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	@keyframes blob {
		0% {
			transform: translate(0px, 0px) scale(1);
		}
		33% {
			transform: translate(30px, -50px) scale(1.1);
		}
		66% {
			transform: translate(-20px, 20px) scale(0.9);
		}
		100% {
			transform: translate(0px, 0px) scale(1);
		}
	}
</style>
