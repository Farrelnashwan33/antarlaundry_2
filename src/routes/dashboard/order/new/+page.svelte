<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let services = $derived(data.services);
	let loading = $state(false);
	let selectedService = $state('');
	let estimatedWeight = $state<number | undefined>(undefined);

	let estimatedTotal = $derived(
		selectedService && estimatedWeight
			? (services.find((s: any) => s.id === selectedService)?.pricePerKg || 0) * estimatedWeight
			: 0
	);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};
</script>

<svelte:head>
	<title>Buat Pesanan Baru - Atar Laundry</title>
</svelte:head>

<!-- Premium Background with Orange Gradient and Floating Orbs -->
<div
	class="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4 py-12 font-sans sm:px-6 lg:px-8"
>
	<!-- Decorative Floating Orbs -->
	<div class="pointer-events-none absolute top-0 left-0 z-0 h-full w-full overflow-hidden">
		<div
			class="absolute -top-24 -left-24 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-300 to-blue-500 opacity-40 blur-2xl"
		></div>
		<div
			class="absolute right-12 bottom-12 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-300 opacity-50 blur-xl"
		></div>
		<div
			class="absolute top-1/2 left-1/4 h-32 w-32 rounded-full bg-blue-400 opacity-30 blur-lg"
		></div>
	</div>

	<div class="relative z-10 mx-auto max-w-5xl">
		<!-- Back Link -->
		<a
			href="/dashboard"
			class="mb-6 inline-flex items-center font-medium text-blue-600 transition-colors hover:text-blue-800"
		>
			<svg class="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				></path></svg
			>
			Kembali ke Dashboard
		</a>

		<!-- Main Card -->
		<div
			class="overflow-hidden rounded-[2.5rem] border border-white/50 bg-white/90 shadow-2xl backdrop-blur-sm"
		>
			<!-- Header Area -->
			<div class="pt-10 pb-6 text-center">
				<h1 class="text-3xl font-extrabold tracking-tight text-surface-900">Atar Laundry</h1>
				<p class="mt-2 font-medium text-surface-500">Buat Pesanan Baru</p>
			</div>

			<!-- Fake Step Indicator -->
			<div class="mb-10 flex items-center justify-center px-4">
				<div class="flex w-full max-w-lg items-center">
					<div class="flex flex-col items-center">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white shadow-md shadow-blue-500/30"
						>
							1
						</div>
						<span class="mt-2 text-[10px] font-semibold tracking-wider text-surface-700 uppercase"
							>Layanan</span
						>
					</div>
					<div class="mx-2 -mt-6 h-px flex-1 bg-surface-200"></div>
					<div class="flex flex-col items-center">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-500"
						>
							2
						</div>
						<span class="mt-2 text-[10px] font-semibold tracking-wider text-surface-500 uppercase"
							>Informasi</span
						>
					</div>
					<div class="mx-2 -mt-6 h-px flex-1 bg-surface-200"></div>
					<div class="flex flex-col items-center">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-500"
						>
							3
						</div>
						<span class="mt-2 text-[10px] font-semibold tracking-wider text-surface-500 uppercase"
							>Selesai</span
						>
					</div>
				</div>
			</div>

			{#if form?.error}
				<div
					class="mx-10 mb-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-center text-sm font-medium text-red-600"
				>
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
				class="px-8 pb-12 md:px-12"
			>
				<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
					<!-- Left Column: Services -->
					<div class="space-y-6">
						<h2
							class="mb-4 flex items-center text-sm font-bold tracking-wider text-surface-800 uppercase"
						>
							<span class="mr-2 h-2 w-2 rounded-full bg-blue-500"></span> Pilih Layanan
						</h2>

						<input type="hidden" name="serviceId" value={selectedService} required />

						<div class="grid gap-4">
							{#each services as service}
								<button
									type="button"
									onclick={() => (selectedService = service.id)}
									class="w-full rounded-2xl border-2 p-5 text-left transition-all duration-300 focus:outline-none {selectedService ===
									service.id
										? 'border-blue-500 bg-blue-50/50 shadow-md shadow-blue-500/10'
										: 'border-transparent bg-surface-50 hover:bg-surface-100'}"
								>
									<div class="flex items-start justify-between">
										<div>
											<h3 class="text-lg font-bold text-surface-900">{service.name}</h3>
											<p class="mt-1 text-xs leading-relaxed text-surface-500">
												{service.description}
											</p>
										</div>
										<div
											class="ml-4 rounded-xl border border-blue-100 bg-white px-3 py-1.5 text-sm font-bold whitespace-nowrap text-blue-600 shadow-sm"
										>
											{formatCurrency(service.pricePerKg)}/kg
										</div>
									</div>
								</button>
							{/each}
						</div>
					</div>

					<!-- Right Column: Details -->
					<div class="space-y-6">
						<h2
							class="mb-4 flex items-center text-sm font-bold tracking-wider text-surface-800 uppercase"
						>
							<span class="mr-2 h-2 w-2 rounded-full bg-blue-500"></span> Informasi Penjemputan
						</h2>

						<div class="space-y-5">
							<div>
								<label
									for="weight"
									class="mb-2 ml-1 block text-[11px] font-semibold tracking-wider text-surface-500 uppercase"
									>Perkiraan Berat (Kg)</label
								>
								<input
									type="number"
									id="weight"
									name="weight"
									bind:value={estimatedWeight}
									min="1"
									step="0.5"
									class="w-full rounded-2xl border-transparent bg-surface-50 px-5 py-4 text-sm transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
									placeholder="Contoh: 3"
									required
								/>
							</div>

							<div>
								<label
									for="address"
									class="mb-2 ml-1 block text-[11px] font-semibold tracking-wider text-surface-500 uppercase"
									>Alamat Lengkap</label
								>
								<textarea
									id="address"
									name="address"
									rows="3"
									class="w-full resize-none rounded-2xl border-transparent bg-surface-50 px-5 py-4 text-sm transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
									placeholder="Contoh: Jl. Sudirman No. 123. Patokan: Sebelah warung."
									required></textarea>
							</div>

							<div>
								<label
									for="notes"
									class="mb-2 ml-1 block text-[11px] font-semibold tracking-wider text-surface-500 uppercase"
									>Catatan Tambahan</label
								>
								<textarea
									id="notes"
									name="notes"
									rows="2"
									class="w-full resize-none rounded-2xl border-transparent bg-surface-50 px-5 py-4 text-sm transition-all focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
									placeholder="Contoh: Baju putih tolong dipisah."></textarea>
							</div>
						</div>

						<!-- Payment Method -->
						<div class="mt-6 space-y-4 border-t border-surface-100 pt-6">
							<h2
								class="mb-4 flex items-center text-sm font-bold tracking-wider text-surface-800 uppercase"
							>
								<span class="mr-2 h-2 w-2 rounded-full bg-blue-500"></span> Metode Pembayaran
							</h2>

							<div class="grid grid-cols-1 gap-4">
								<label
									class="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-surface-200 p-4 transition-colors hover:bg-surface-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
								>
									<div class="flex-1">
										<div class="text-sm font-bold text-surface-900">
											Bayar Nanti (Tunai/Transfer)
										</div>
										<div class="mt-1 text-xs text-surface-500">
											Bayar saat kurir mengambil atau mengantar pakaian
										</div>
									</div>
									<input
										type="radio"
										name="paymentMethod"
										value="CASH"
										class="mt-0.5 h-5 w-5 border-surface-300 text-blue-600 focus:ring-blue-500"
										checked
									/>
								</label>

								<label
									class="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-surface-200 p-4 transition-colors hover:bg-surface-50 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
								>
									<div class="flex-1">
										<div class="text-sm font-bold text-surface-900">Saldo AntarLaundry</div>
										<div
											class="mt-1 text-xs {data.wallet.balance >= estimatedTotal &&
											estimatedTotal > 0
												? 'text-green-600'
												: 'font-medium text-red-500'}"
										>
											Saldo Anda: {formatCurrency(data.wallet.balance)}
											{#if estimatedTotal > 0 && data.wallet.balance < estimatedTotal}
												<br />(Saldo tidak mencukupi)
											{/if}
										</div>
									</div>
									<input
										type="radio"
										name="paymentMethod"
										value="SALDO"
										class="mt-0.5 h-5 w-5 border-surface-300 text-blue-600 focus:ring-blue-500"
										disabled={estimatedTotal > 0 && data.wallet.balance < estimatedTotal}
									/>
								</label>
							</div>
						</div>

						<!-- Summary & Submit -->
						<div class="mt-6 border-t border-surface-100 pt-6">
							<div
								class="mb-6 flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50 p-5"
							>
								<div>
									<h4 class="text-sm font-bold text-surface-900">Estimasi Biaya</h4>
									<p class="mt-0.5 text-[11px] text-surface-500">Dihitung otomatis</p>
								</div>
								<div class="text-2xl font-black text-blue-600">
									{estimatedTotal > 0 ? formatCurrency(estimatedTotal) : 'Rp 0'}
								</div>
							</div>

							<button
								type="submit"
								disabled={!selectedService || loading}
								class="flex w-full transform items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/40 transition-all hover:-translate-y-1 hover:from-blue-600 hover:to-blue-700 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
							>
								{#if loading}
									<svg
										class="h-5 w-5 animate-spin text-white"
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
									Memproses...
								{:else}
									Simpan & Lanjutkan
								{/if}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>
