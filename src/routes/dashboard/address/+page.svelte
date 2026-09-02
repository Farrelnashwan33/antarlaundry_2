<script lang="ts">
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	let { data } = $props();
	let addresses = $derived(data.addresses);
</script>

<svelte:head>
	<title>Alamat Saya - Antar Laundry</title>
</svelte:head>

<div class="p-6 lg:p-10">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight text-surface-900">Alamat Saya</h1>
			<p class="mt-1 text-surface-500">Kelola alamat penjemputan dan pengantaran</p>
		</div>
		<a
			href="/dashboard/address/new"
			class="flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 font-medium text-white shadow-sm transition-colors hover:bg-primary-700"
		>
			<span class="text-xl">+</span>
			<span>Tambah Alamat</span>
		</a>
	</div>

	{#if addresses.length === 0}
		<div class="rounded-3xl border border-surface-200 bg-white p-10 text-center shadow-sm">
			<div class="mb-4 text-6xl opacity-50">📍</div>
			<h3 class="mb-2 text-xl font-bold text-surface-900">Belum ada alamat</h3>
			<p class="mb-6 text-surface-500">
				Anda belum menambahkan alamat untuk penjemputan atau pengantaran.
			</p>
			<a
				href="/dashboard/address/new"
				class="inline-flex rounded-xl bg-primary-50 px-6 py-3 font-semibold text-primary-600 transition-colors hover:bg-primary-100"
			>
				Tambah Alamat Sekarang
			</a>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each addresses as address}
				<div class="flex flex-col rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
					<div class="mb-4 flex items-start justify-between">
						<span
							class="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-bold tracking-wider text-primary-800 uppercase"
						>
							{address.label}
						</span>
					</div>

					<p class="flex-grow leading-relaxed font-medium text-surface-800">
						{address.fullAddress}
					</p>

					<div class="mt-4 border-t border-surface-100 pt-4 text-sm text-surface-500">
						{address.city}
						{address.postalCode ? `- ${address.postalCode}` : ''}
					</div>

					<div class="mt-6 flex justify-end gap-3">
						<a
							href={`/dashboard/address/edit/${address.id}`}
							class="rounded-lg px-3 py-1.5 text-sm font-medium text-surface-500 transition-colors hover:bg-surface-50 hover:text-primary-600"
						>
							Edit
						</a>
						<form
							method="POST"
							action="?/delete"
							use:enhance={() => {
								return async ({ result, update }) => {
									if (result.type === 'success') {
										update();
									}
								};
							}}
						>
							<input type="hidden" name="id" value={address.id} />
							<button
								type="submit"
								class="text-error-500 hover:text-error-600 hover:bg-error-50 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors"
								onclick={(e) => {
									if (!confirm('Apakah Anda yakin ingin menghapus alamat ini?')) e.preventDefault();
								}}
							>
								Hapus
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
