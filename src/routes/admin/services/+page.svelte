<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();
	let services = $derived(data.services);

	let isAddingService = $state(false);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};
</script>

<svelte:head>
	<title>Services - Admin Dashboard</title>
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
			<span>Services</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Services & Pricing</h1>
			<button
				onclick={() => (isAddingService = !isAddingService)}
				class="flex items-center gap-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
			>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"
					></path></svg
				>
				{isAddingService ? 'Cancel' : 'Add Service'}
			</button>
		</div>
	</div>

	{#if isAddingService}
		<div class="animate-fade-in rounded-xl border border-surface-100 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-lg font-medium text-surface-900">Create New Service</h3>
			<form
				method="POST"
				action="?/createService"
				use:enhance
				class="grid grid-cols-1 gap-4 md:grid-cols-2"
			>
				<div class="flex flex-col gap-1">
					<label for="name" class="text-sm font-medium text-surface-700">Service Name</label>
					<input
						type="text"
						id="name"
						name="name"
						required
						placeholder="e.g. Cuci Komplit"
						class="rounded-md border border-surface-200 px-3 py-2 outline-none focus:border-blue-500"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="pricePerKg" class="text-sm font-medium text-surface-700"
						>Price per Kg (Rp)</label
					>
					<input
						type="number"
						id="pricePerKg"
						name="pricePerKg"
						required
						min="0"
						placeholder="e.g. 7000"
						class="rounded-md border border-surface-200 px-3 py-2 outline-none focus:border-blue-500"
					/>
				</div>
				<div class="flex flex-col gap-1 md:col-span-2">
					<label for="description" class="text-sm font-medium text-surface-700">Description</label>
					<textarea
						id="description"
						name="description"
						rows="2"
						placeholder="Describe what this service includes..."
						class="rounded-md border border-surface-200 px-3 py-2 outline-none focus:border-blue-500"
					></textarea>
				</div>
				<div class="flex flex-col gap-1">
					<label for="estimatedDays" class="text-sm font-medium text-surface-700"
						>Estimated Days to Complete</label
					>
					<input
						type="number"
						id="estimatedDays"
						name="estimatedDays"
						required
						min="1"
						value="3"
						class="rounded-md border border-surface-200 px-3 py-2 outline-none focus:border-blue-500"
					/>
				</div>
				<div class="mt-2 flex flex-col gap-1 md:col-span-2">
					<h4 class="text-sm font-semibold text-surface-800">Optional Rules</h4>
				</div>
				<div class="flex flex-col gap-1">
					<label for="minWeight" class="text-sm font-medium text-surface-700"
						>Min. Weight (Kg)</label
					>
					<input
						type="number"
						step="0.1"
						id="minWeight"
						name="minWeight"
						placeholder="e.g. 3"
						class="rounded-md border border-surface-200 px-3 py-2 outline-none focus:border-blue-500"
					/>
				</div>
				<div class="flex flex-col gap-1">
					<label for="minPrice" class="text-sm font-medium text-surface-700">Min. Price (Rp)</label>
					<input
						type="number"
						id="minPrice"
						name="minPrice"
						placeholder="e.g. 20000"
						class="rounded-md border border-surface-200 px-3 py-2 outline-none focus:border-blue-500"
					/>
				</div>
				<div class="mt-4 flex justify-end md:col-span-2">
					<button
						type="submit"
						class="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
					>
						Save Service
					</button>
				</div>
			</form>
		</div>
	{/if}

	<div
		class="flex flex-col overflow-hidden rounded-xl border border-surface-100 bg-white shadow-sm"
	>
		<!-- Table -->
		<div class="overflow-x-auto">
			<table class="w-full text-left text-sm whitespace-nowrap">
				<thead
					class="border-b border-surface-100 bg-surface-50/50 text-[11px] tracking-wider text-surface-400 uppercase"
				>
					<tr>
						<th class="px-5 py-3 font-medium">Service Name</th>
						<th class="px-5 py-3 font-medium">Description</th>
						<th class="px-5 py-3 font-medium">Est. Days</th>
						<th class="px-5 py-3 font-medium">Price / Kg</th>
						<th class="px-5 py-3 text-center font-medium">Status</th>
						<th class="px-5 py-3 text-right font-medium">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-100/60">
					{#each services as service}
						<tr class="transition-colors hover:bg-surface-50/50">
							<td class="px-5 py-4">
								<span class="font-medium text-surface-900">{service.name}</span>
							</td>
							<td
								class="max-w-[200px] truncate px-5 py-4 text-surface-500"
								title={service.description}
							>
								{service.description || '-'}
							</td>
							<td class="px-5 py-4 text-surface-600">
								{service.estimatedDays} days
							</td>
							<td class="px-5 py-4">
								<form
									method="POST"
									action="?/updateService"
									use:enhance
									class="flex items-center justify-end gap-2 md:justify-start"
								>
									<input type="hidden" name="serviceId" value={service.id} />
									<input type="hidden" name="estimatedDays" value={service.estimatedDays} />
									<input
										type="hidden"
										name="isActive"
										value={service.isActive ? 'true' : 'false'}
									/>

									<div class="flex flex-col gap-1">
										<span class="text-[9px] font-bold tracking-wider text-surface-400 uppercase"
											>Price/Kg</span
										>
										<input
											type="number"
											name="pricePerKg"
											value={service.pricePerKg}
											min="0"
											class="w-20 rounded border border-surface-200 px-2 py-1 text-sm outline-none focus:border-blue-500"
											required
										/>
									</div>
									<div class="flex flex-col gap-1">
										<span class="text-[9px] font-bold tracking-wider text-surface-400 uppercase"
											>Min Kg</span
										>
										<input
											type="number"
											step="0.1"
											name="minWeight"
											value={service.minWeight || ''}
											placeholder="-"
											class="w-14 rounded border border-surface-200 px-2 py-1 text-sm outline-none focus:border-blue-500"
										/>
									</div>
									<div class="flex flex-col gap-1">
										<span class="text-[9px] font-bold tracking-wider text-surface-400 uppercase"
											>Min Rp</span
										>
										<input
											type="number"
											name="minPrice"
											value={service.minPrice || ''}
											placeholder="-"
											class="w-20 rounded border border-surface-200 px-2 py-1 text-sm outline-none focus:border-blue-500"
										/>
									</div>
									<div class="mt-3.5 flex h-full flex-col justify-end gap-1">
										<button
											type="submit"
											class="rounded bg-surface-100 px-2 py-1 text-xs font-medium text-surface-600 transition-colors hover:bg-surface-200"
											>Save</button
										>
									</div>
								</form>
							</td>
							<td class="px-5 py-4 text-center">
								<form method="POST" action="?/updateService" use:enhance>
									<input type="hidden" name="serviceId" value={service.id} />
									<input type="hidden" name="estimatedDays" value={service.estimatedDays} />
									<input type="hidden" name="pricePerKg" value={service.pricePerKg} />
									<input type="hidden" name="minWeight" value={service.minWeight || ''} />
									<input type="hidden" name="minPrice" value={service.minPrice || ''} />

									<label class="relative inline-flex cursor-pointer items-center">
										<input
											type="checkbox"
											name="isActive"
											class="peer sr-only"
											checked={service.isActive}
											onchange={(e) => e.currentTarget.form?.requestSubmit()}
										/>
										<div
											class="peer h-5 w-9 rounded-full bg-surface-200 peer-checked:bg-blue-600 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-surface-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"
										></div>
									</label>
								</form>
							</td>
							<td class="px-5 py-4 text-right">
								<button
									class="text-surface-400 transition-colors hover:text-red-500"
									aria-label="Delete service"
								>
									<svg
										class="inline-block h-4 w-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
										></path></svg
									>
								</button>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6" class="px-5 py-8 text-center text-surface-500">
								No services found.
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<!-- Pagination -->
		<div
			class="flex items-center justify-between border-t border-surface-100 p-4 text-sm text-surface-500"
		>
			<div>Showing <span class="font-medium text-surface-900">{services.length}</span> results</div>
		</div>
	</div>
</div>
