<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Card from '$lib/components/ui/Card.svelte';
	import Input from '$lib/components/ui/Input.svelte';

	let { form } = $props();
	let loading = $state(false);
</script>

<svelte:head>
	<title>Daftar - Antar Laundry</title>
</svelte:head>

<div class="flex min-h-[80vh] items-center justify-center px-4 py-12">
	<Card padding="lg" class="w-full max-w-md">
		<div class="mb-8 text-center">
			<h1 class="mb-2 text-2xl font-bold text-surface-900">Daftar Akun Baru</h1>
			<p class="text-surface-600">Bergabunglah dengan Antar Laundry sekarang.</p>
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
			<Input label="Nama Lengkap" id="name" type="text" placeholder="Masukkan nama Anda" required />
			<Input label="Email" id="email" type="email" placeholder="contoh@email.com" required />
			<Input label="Nomor WhatsApp" id="phone" type="tel" placeholder="081234567890" required />
			<Input
				label="Kata Sandi"
				id="password"
				type="password"
				placeholder="Minimal 6 karakter"
				required
				minlength={6}
			/>

			<div class="mb-6">
				<label for="role" class="mb-1 block text-sm font-medium text-surface-700"
					>Mendaftar Sebagai</label
				>
				<select
					id="role"
					name="role"
					class="w-full rounded-lg border border-surface-300 bg-white px-4 py-2 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 focus:outline-none"
				>
					<option value="CUSTOMER">Pelanggan</option>
					<option value="COURIER">Go Laundry</option>
				</select>
			</div>

			<Button type="submit" class="w-full" {loading}>Daftar Sekarang</Button>
		</form>

		<div class="mt-6 text-center text-sm text-surface-600">
			Sudah punya akun? <a href="/login" class="font-medium text-primary hover:underline"
				>Masuk di sini</a
			>
		</div>
	</Card>
</div>
