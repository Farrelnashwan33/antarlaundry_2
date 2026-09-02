<script lang="ts">
	import { enhance } from '$app/forms';

	let { data, form } = $props();
	let addresses = $derived(data.addresses);

	let selectedVehicle = $state('MOTOR');
	let selectedService = $state('PICKUP_AND_DELIVERY');

	const vehicles = [
		{ id: 'MOTOR', name: 'Motor', desc: 'Maks. 10 kg', icon: '🛵', price: 15000 },
		{ id: 'MOTOR_BOX', name: 'Motor Box', desc: 'Maks. 20 kg', icon: '🛺', price: 25000 },
		{ id: 'MOBIL', name: 'Mobil', desc: 'Maks. 50 kg', icon: '🚗', price: 50000 }
	];

	let currentPrice = $derived.by(() => {
		const v = vehicles.find((v) => v.id === selectedVehicle);
		let p = v ? v.price : 15000;
		if (selectedService === 'PICKUP_AND_DELIVERY') p *= 2;
		return p;
	});
</script>

<svelte:head>
	<title>Pesan Go Laundry</title>
</svelte:head>

<div class="mx-auto w-full max-w-3xl">
	<div class="mb-8 flex items-center gap-3">
		<div
			class="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-2xl text-white shadow-sm shadow-blue-600/30"
		>
			🛵
		</div>
		<div>
			<h1 class="text-2xl leading-tight font-black text-surface-900">GO LAUNDRY</h1>
			<p class="text-sm text-surface-500">Antar-Jemput Laundry Lebih Cepat</p>
		</div>
	</div>

	{#if form?.error}
		<div
			class="mb-6 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600"
		>
			{form.error}
		</div>
	{/if}

	<form
		method="POST"
		use:enhance
		class="rounded-3xl border border-surface-200 bg-white p-6 shadow-sm md:p-8"
	>
		<div class="mb-8">
			<h3 class="mb-4 font-bold text-surface-900">Pilih Jenis Layanan</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				<label class="cursor-pointer">
					<input
						type="radio"
						name="serviceType"
						value="PICKUP_ONLY"
						bind:group={selectedService}
						class="peer sr-only"
					/>
					<div
						class="rounded-2xl border-2 border-surface-200 p-4 text-center transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50"
					>
						<div class="mb-1 text-xl">🏠 ➡️ 🧺</div>
						<div class="text-sm font-bold text-surface-900">Jemput Saja</div>
					</div>
				</label>
				<label class="cursor-pointer">
					<input
						type="radio"
						name="serviceType"
						value="DELIVERY_ONLY"
						bind:group={selectedService}
						class="peer sr-only"
					/>
					<div
						class="rounded-2xl border-2 border-surface-200 p-4 text-center transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50"
					>
						<div class="mb-1 text-xl">🧺 ➡️ 🏠</div>
						<div class="text-sm font-bold text-surface-900">Antar Saja</div>
					</div>
				</label>
				<label class="cursor-pointer">
					<input
						type="radio"
						name="serviceType"
						value="PICKUP_AND_DELIVERY"
						bind:group={selectedService}
						class="peer sr-only"
					/>
					<div
						class="rounded-2xl border-2 border-surface-200 p-4 text-center transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50"
					>
						<div class="mb-1 text-xl">🔄</div>
						<div class="text-sm font-bold text-surface-900">Antar & Jemput</div>
					</div>
				</label>
			</div>
		</div>

		<div class="mb-8">
			<h3 class="mb-4 font-bold text-surface-900">Pilih Kendaraan</h3>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
				{#each vehicles as v}
					<label class="relative cursor-pointer">
						<input
							type="radio"
							name="vehicleType"
							value={v.id}
							bind:group={selectedVehicle}
							class="peer sr-only"
						/>
						<div
							class="rounded-2xl border-2 border-surface-200 p-4 transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50"
						>
							<div class="mb-2 text-3xl">{v.icon}</div>
							<div class="text-sm font-bold text-surface-900">{v.name}</div>
							<div class="mt-1 text-xs text-surface-500">{v.desc}</div>

							{#if selectedVehicle === v.id}
								<div class="absolute top-4 right-4 text-blue-600">
									<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"
										><path
											fill-rule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clip-rule="evenodd"
										></path></svg
									>
								</div>
							{/if}
						</div>
					</label>
				{/each}
			</div>
		</div>

		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<div>
				<label for="pickupAddress" class="mb-2 block text-sm font-bold text-surface-900"
					>Alamat Penjemputan</label
				>
				{#if addresses.length > 0}
					<select
						name="pickupAddress"
						id="pickupAddress"
						class="w-full rounded-xl border border-surface-300 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none"
					>
						{#each addresses as addr}
							<option value={addr.fullAddress}>{addr.label}: {addr.fullAddress}</option>
						{/each}
						<option value="Input Manual">Ketik Alamat Lain (Tulis di Catatan)</option>
					</select>
				{:else}
					<textarea
						name="pickupAddress"
						id="pickupAddress"
						rows="2"
						class="w-full rounded-xl border border-surface-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
						placeholder="Masukkan alamat lengkap..."
						required></textarea>
				{/if}
			</div>

			<div>
				<label for="destinationAddress" class="mb-2 block text-sm font-bold text-surface-900"
					>Alamat Tujuan (Laundry)</label
				>
				<textarea
					name="destinationAddress"
					id="destinationAddress"
					rows="2"
					class="w-full rounded-xl border border-surface-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
					placeholder="Masukkan alamat laundry tujuan..."
					required>Toko Antar Laundry, Jl. Utama No. 1</textarea
				>
			</div>
		</div>

		<div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
			<div>
				<label for="estimatedWeight" class="mb-2 block text-sm font-bold text-surface-900"
					>Estimasi Berat Pakaian (KG)</label
				>
				<input
					type="number"
					name="estimatedWeight"
					id="estimatedWeight"
					class="w-full rounded-xl border border-surface-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
					placeholder="Contoh: 5"
					min="1"
					required
				/>
			</div>
			<div>
				<label for="notes" class="mb-2 block text-sm font-bold text-surface-900"
					>Catatan untuk Kurir (Opsional)</label
				>
				<input
					type="text"
					name="notes"
					id="notes"
					class="w-full rounded-xl border border-surface-300 px-4 py-3 focus:ring-2 focus:ring-blue-600 focus:outline-none"
					placeholder="Pakaian warna putih tolong dipisah"
				/>
			</div>
		</div>

		<!-- Summary -->
		<div
			class="mb-6 flex flex-col items-center justify-between gap-6 rounded-2xl border border-surface-200 bg-surface-50 p-6 md:flex-row"
		>
			<div>
				<p class="mb-1 text-sm font-medium text-surface-500">Estimasi Biaya Pengantaran</p>
				<div class="text-3xl font-black text-surface-900">
					Rp{currentPrice.toLocaleString('id-ID')}
				</div>
			</div>
			<button
				type="submit"
				class="w-full rounded-xl bg-blue-600 px-8 py-3.5 text-center font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 md:w-auto"
			>
				Pesan Go Laundry
			</button>
		</div>
	</form>
</div>
