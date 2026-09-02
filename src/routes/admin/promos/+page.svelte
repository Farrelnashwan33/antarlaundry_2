<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let promos = $derived(data.promos);
</script>

<svelte:head>
	<title>Promos & Ads - Admin Dashboard</title>
</svelte:head>

<div class="flex w-full flex-col gap-6">
	<!-- Breadcrumb and Title -->
	<div class="flex flex-col gap-1">
		<div class="flex items-center gap-2 text-[11px] font-medium text-surface-500">
			<svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				></path></svg
			>
			<span>&rsaquo;</span>
			<a href="/admin" class="transition-colors hover:text-surface-900">Admin</a>
			<span>&rsaquo;</span>
			<span>Promos</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Promos & Ads</h1>
		</div>
		<p class="text-sm text-surface-500">
			Manage promotional banners and advertisements shown on the customer dashboard.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
		<!-- Create Promo Form -->
		<div class="lg:col-span-1">
			<div class="rounded-xl border border-surface-100 bg-white p-5 shadow-sm">
				<h3 class="mb-4 text-lg font-medium text-surface-900">Create New Promo</h3>
				<form method="POST" action="?/createPromo" use:enhance class="flex flex-col gap-4">
					<div>
						<label for="code" class="mb-1 block text-sm font-medium text-surface-700"
							>Promo Title / Code (e.g. Diskon 20%)</label
						>
						<input
							type="text"
							id="code"
							name="code"
							required
							class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
							placeholder="Diskon 20%"
						/>
					</div>
					<div>
						<label for="description" class="mb-1 block text-sm font-medium text-surface-700"
							>Description / Message</label
						>
						<textarea
							id="description"
							name="description"
							required
							rows="2"
							class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
							placeholder="Untuk pesanan pertama kamu!"></textarea>
					</div>
					<div>
						<label for="discountPct" class="mb-1 block text-sm font-medium text-surface-700"
							>Discount % (Optional)</label
						>
						<input
							type="number"
							id="discountPct"
							name="discountPct"
							min="0"
							max="100"
							class="w-full rounded-md border border-surface-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
							placeholder="20"
						/>
					</div>
					<div class="mt-2 flex items-center gap-2">
						<input
							type="checkbox"
							id="isActive"
							name="isActive"
							class="h-4 w-4 rounded border-surface-300 text-blue-600 focus:ring-blue-500"
							checked
						/>
						<label for="isActive" class="text-sm font-medium text-surface-700"
							>Set as Active Banner</label
						>
					</div>
					<p class="text-[11px] text-surface-500">
						Note: Only one banner can be active at a time. Activating this will disable others.
					</p>
					<button
						type="submit"
						class="mt-2 w-full rounded-md bg-blue-600 py-2 font-medium text-white transition-colors hover:bg-blue-700"
					>
						Create Promo
					</button>
				</form>
			</div>
		</div>

		<!-- Promos List -->
		<div class="lg:col-span-2">
			<div
				class="flex flex-col overflow-hidden rounded-xl border border-surface-100 bg-white shadow-sm"
			>
				<div class="border-b border-surface-100 p-5">
					<h3 class="text-lg font-medium text-surface-900">All Promos</h3>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full text-left text-sm whitespace-nowrap">
						<thead
							class="border-b border-surface-100 bg-surface-50/50 text-[11px] tracking-wider text-surface-400 uppercase"
						>
							<tr>
								<th class="px-5 py-3 font-medium">Title/Code</th>
								<th class="px-5 py-3 font-medium">Description</th>
								<th class="px-5 py-3 font-medium">Discount</th>
								<th class="px-5 py-3 font-medium">Status</th>
								<th class="px-5 py-3 text-right font-medium">Actions</th>
							</tr>
						</thead>
						<tbody class="divide-y divide-surface-100/60">
							{#each promos as promo}
								<tr class="transition-colors hover:bg-surface-50/50">
									<td class="px-5 py-4 font-bold text-surface-900">
										{promo.code}
									</td>
									<td
										class="max-w-[200px] truncate px-5 py-4 text-surface-600"
										title={promo.description}
									>
										{promo.description}
									</td>
									<td class="px-5 py-4 text-surface-600">
										{promo.discountPct ? `${promo.discountPct}%` : '-'}
									</td>
									<td class="px-5 py-4">
										{#if promo.isActive}
											<span
												class="rounded-full border border-green-100/50 bg-green-50 px-2.5 py-1 text-[10px] font-bold tracking-wider text-green-600 uppercase"
												>Active</span
											>
										{:else}
											<span
												class="rounded-full border border-surface-200/60 bg-surface-100 px-2.5 py-1 text-[10px] font-bold tracking-wider text-surface-500 uppercase"
												>Inactive</span
											>
										{/if}
									</td>
									<td class="flex items-center justify-end gap-2 px-5 py-4 text-right">
										<form method="POST" action="?/toggleActive" use:enhance>
											<input type="hidden" name="promoId" value={promo.id} />
											<input type="hidden" name="currentStatus" value={promo.isActive.toString()} />
											<button
												type="submit"
												class="text-[11px] {promo.isActive
													? 'text-orange-600 hover:bg-orange-50'
													: 'text-green-600 hover:bg-green-50'} rounded px-3 py-1.5 font-bold transition-colors"
											>
												{promo.isActive ? 'Deactivate' : 'Activate'}
											</button>
										</form>

										<form
											method="POST"
											action="?/deletePromo"
											use:enhance
											onsubmit={(e) => {
												if (!confirm('Yakin ingin menghapus promo ini?')) e.preventDefault();
											}}
										>
											<input type="hidden" name="promoId" value={promo.id} />
											<button
												type="submit"
												class="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-700"
												title="Delete Promo"
											>
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
													><path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
													></path></svg
												>
											</button>
										</form>
									</td>
								</tr>
							{:else}
								<tr>
									<td colspan="5" class="px-5 py-8 text-center text-surface-500">
										Belum ada promo yang dibuat.
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
