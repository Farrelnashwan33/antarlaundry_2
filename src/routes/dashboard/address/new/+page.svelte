<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Tambah Alamat - Antar Laundry</title>
</svelte:head>

<div class="mx-auto max-w-2xl p-6 lg:p-10">
	<div class="mb-8">
		<a
			href="/dashboard/address"
			class="mb-4 inline-flex items-center font-medium text-surface-500 transition-colors hover:text-primary-600"
		>
			<span class="mr-2">←</span> Kembali ke Alamat Saya
		</a>
		<h1 class="text-3xl font-extrabold tracking-tight text-surface-900">Tambah Alamat Baru</h1>
		<p class="mt-1 text-surface-500">Masukkan detail alamat untuk penjemputan dan pengantaran</p>
	</div>

	{#if form?.error}
		<div
			class="bg-error-50 text-error-600 border-error-100 mb-6 flex items-start gap-3 rounded-xl border p-4"
		>
			<span class="text-xl">⚠️</span>
			<p class="mt-0.5 font-medium">{form.error}</p>
		</div>
	{/if}

	<form
		method="POST"
		use:enhance
		class="space-y-6 rounded-3xl border border-surface-200 bg-white p-6 shadow-sm lg:p-8"
	>
		<div>
			<label for="label" class="mb-2 block text-sm font-bold text-surface-900"
				>Label Alamat <span class="text-error-500">*</span></label
			>
			<input
				type="text"
				id="label"
				name="label"
				placeholder="Contoh: Rumah, Kantor, Kost"
				required
				class="block w-full rounded-xl border border-surface-200 bg-surface-50 p-3.5 text-sm text-surface-900 transition-colors focus:border-primary-500 focus:ring-primary-500"
			/>
		</div>

		<div>
			<label for="fullAddress" class="mb-2 block text-sm font-bold text-surface-900"
				>Alamat Lengkap <span class="text-error-500">*</span></label
			>
			<textarea
				id="fullAddress"
				name="fullAddress"
				rows="3"
				placeholder="Nama jalan, gedung, nomor rumah, RT/RW, dll."
				required
				class="block w-full resize-none rounded-xl border border-surface-200 bg-surface-50 p-3.5 text-sm text-surface-900 transition-colors focus:border-primary-500 focus:ring-primary-500"
			></textarea>
		</div>

		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			<div>
				<label for="city" class="mb-2 block text-sm font-bold text-surface-900"
					>Kota / Kabupaten <span class="text-error-500">*</span></label
				>
				<input
					type="text"
					id="city"
					name="city"
					required
					class="block w-full rounded-xl border border-surface-200 bg-surface-50 p-3.5 text-sm text-surface-900 transition-colors focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>

			<div>
				<label for="postalCode" class="mb-2 block text-sm font-bold text-surface-900"
					>Kode Pos <span class="font-normal text-surface-400">(Opsional)</span></label
				>
				<input
					type="text"
					id="postalCode"
					name="postalCode"
					class="block w-full rounded-xl border border-surface-200 bg-surface-50 p-3.5 text-sm text-surface-900 transition-colors focus:border-primary-500 focus:ring-primary-500"
				/>
			</div>
		</div>

		<div class="flex gap-4 pt-4">
			<a
				href="/dashboard/address"
				class="w-full rounded-xl border border-surface-300 px-4 py-3.5 text-center font-bold text-surface-700 transition-colors hover:bg-surface-50"
			>
				Batal
			</a>
			<button
				type="submit"
				class="w-full rounded-xl bg-primary-600 px-4 py-3.5 text-center font-bold text-white shadow-sm transition-colors hover:bg-primary-700"
			>
				Simpan Alamat
			</button>
		</div>
	</form>
</div>
