<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Masuk - Antar Laundry</title>
</svelte:head>

<div class="flex min-h-[80vh] items-center justify-center px-4 py-12">
	<Card padding="lg" class="w-full max-w-md">
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-2xl font-bold text-surface-900">Selamat Datang Kembali</h1>
			<p class="text-surface-600">Masuk ke akun Antar Laundry Anda.</p>
		</div>

		{#if form?.error}
			<div class="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
				{form.error}
			</div>
		{/if}

		<form
			method="POST"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
		>
			<Input label="Email" id="email" type="email" placeholder="contoh@email.com" required />
			<Input
				label="Kata Sandi"
				id="password"
				type="password"
				placeholder="Masukkan kata sandi"
				required
			/>

			<div class="mb-6 flex items-center justify-end">
				<a
					href="https://wa.me/6285720387781?text=Halo%20Admin,%20saya%20lupa%20kata%20sandi%20akun%20AntarLaundry%20saya.%20Mohon%20bantuannya%20untuk%20reset."
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm font-medium text-primary hover:underline">Lupa kata sandi?</a
				>
			</div>

			<Button type="submit" class="w-full" {loading}>Masuk</Button>
		</form>

		<div class="mt-6 text-center text-sm text-surface-600">
			Belum punya akun? <a href="/register" class="font-medium text-primary hover:underline"
				>Daftar sekarang</a
			>
		</div>
	</Card>
</div>
