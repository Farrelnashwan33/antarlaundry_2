<script lang="ts">
	import { enhance } from '$app/forms';

	let { data } = $props();

	let selectedCustomerId = $state('');

	let selectedCustomer = $derived(data.customers.find((c: any) => c.id === selectedCustomerId));

	let availableAddresses = $derived(selectedCustomer?.customerProfile?.addresses || []);

	let isSubmitting = $state(false);
</script>

<svelte:head>
	<title>New Order - Admin Dashboard</title>
</svelte:head>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-6">
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
			<a href="/admin/orders" class="transition-colors hover:text-surface-900">Orders</a>
			<span>&rsaquo;</span>
			<span>New Order</span>
		</div>
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-bold tracking-tight text-surface-900">Create New Order</h1>
		</div>
	</div>

	<div class="overflow-hidden rounded-xl border border-surface-100 bg-white shadow-sm">
		<form
			method="POST"
			class="flex flex-col gap-6 p-6"
			use:enhance={() => {
				isSubmitting = true;
				return async ({ update }) => {
					await update();
					isSubmitting = false;
				};
			}}
		>
			<!-- Customer Section -->
			<div>
				<h2 class="mb-4 border-b border-surface-100 pb-2 text-lg font-semibold text-surface-900">
					Customer Details
				</h2>
				<div class="grid grid-cols-1 gap-4">
					<div class="flex flex-col gap-1.5">
						<label for="customerId" class="text-sm font-medium text-surface-700"
							>Select Customer <span class="text-red-500">*</span></label
						>
						<select
							id="customerId"
							name="customerId"
							bind:value={selectedCustomerId}
							required
							class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						>
							<option value="" disabled>-- Choose a customer --</option>
							{#each data.customers as customer}
								<option value={customer.id}
									>{customer.name} ({customer.phone || customer.email})</option
								>
							{/each}
						</select>
					</div>

					{#if selectedCustomerId && availableAddresses.length > 0}
						<div class="flex flex-col gap-1.5">
							<label for="pickupAddressId" class="text-sm font-medium text-surface-700"
								>Pickup / Delivery Address <span class="text-red-500">*</span></label
							>
							<select
								id="pickupAddressId"
								name="pickupAddressId"
								required
								class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
							>
								{#each availableAddresses as address}
									<option value={address.id}
										>{address.label} - {address.fullAddress}, {address.city}</option
									>
								{/each}
							</select>
						</div>
					{:else if selectedCustomerId && availableAddresses.length === 0}
						<div
							class="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800"
						>
							<span class="font-semibold">Warning:</span> This customer does not have any saved addresses.
							An address is required to create an order.
						</div>
					{/if}
				</div>
			</div>

			<!-- Service Details -->
			<div>
				<h2 class="mb-4 border-b border-surface-100 pb-2 text-lg font-semibold text-surface-900">
					Service Details
				</h2>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="flex flex-col gap-1.5">
						<label for="serviceId" class="text-sm font-medium text-surface-700"
							>Laundry Service <span class="text-red-500">*</span></label
						>
						<select
							id="serviceId"
							name="serviceId"
							required
							class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						>
							<option value="" disabled selected>-- Choose a service --</option>
							{#each data.services as service}
								<option value={service.id}
									>{service.name} (Rp {Number(service.pricePerKg).toLocaleString(
										'id-ID'
									)}/Kg)</option
								>
							{/each}
						</select>
					</div>

					<div class="flex flex-col gap-1.5">
						<label for="weight" class="text-sm font-medium text-surface-700"
							>Estimated Weight (Kg) <span class="font-normal text-surface-400">(Optional)</span
							></label
						>
						<input
							type="number"
							id="weight"
							name="weight"
							step="0.1"
							min="0"
							placeholder="e.g. 5"
							class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						/>
					</div>

					<div class="flex flex-col gap-1.5">
						<label for="pickupDate" class="text-sm font-medium text-surface-700"
							>Pickup Date <span class="text-red-500">*</span></label
						>
						<input
							type="datetime-local"
							id="pickupDate"
							name="pickupDate"
							required
							class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
						/>
					</div>
				</div>

				<div class="mt-4 flex flex-col gap-1.5">
					<label for="notes" class="text-sm font-medium text-surface-700"
						>Additional Notes <span class="font-normal text-surface-400">(Optional)</span></label
					>
					<textarea
						id="notes"
						name="notes"
						rows="3"
						placeholder="Any special requests or details for the courier/laundry..."
						class="w-full rounded-lg border border-surface-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
					></textarea>
				</div>
			</div>

			<!-- Actions -->
			<div class="flex justify-end gap-3 border-t border-surface-100 pt-4">
				<a
					href="/admin/orders"
					class="rounded-lg border border-surface-300 bg-white px-5 py-2 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-50"
				>
					Cancel
				</a>
				<button
					type="submit"
					disabled={isSubmitting || !selectedCustomerId || availableAddresses.length === 0}
					class="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{#if isSubmitting}
						<svg
							class="h-4 w-4 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Creating...
					{:else}
						Create Order
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
