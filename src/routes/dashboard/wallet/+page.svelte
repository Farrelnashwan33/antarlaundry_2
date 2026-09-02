<script lang="ts">
	let { data } = $props();
	let { wallet, transactions } = data;

	let showTopUpModal = false;
	let showQrisModal = false;
	let topUpAmount = 0;
	let customAmount = '';
	let isLoading = false;
	let errorMessage = '';

	const presetAmounts = [10000, 25000, 50000, 100000, 200000, 500000];

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0
		}).format(amount);
	};

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	function selectPreset(amount: number) {
		topUpAmount = amount;
		customAmount = '';
	}

	function handleCustomAmountInput(e: Event) {
		const target = e.target as HTMLInputElement;
		const val = parseInt(target.value.replace(/[^0-9]/g, ''));
		if (!isNaN(val)) {
			topUpAmount = val;
			customAmount = val.toString();
		} else {
			topUpAmount = 0;
			customAmount = '';
		}
	}

	function showQris() {
		if (topUpAmount < 10000) {
			errorMessage = 'Minimal top up adalah Rp10.000';
			return;
		}
		showTopUpModal = false;
		showQrisModal = true;
	}

	async function handleTopUp() {
		isLoading = true;
		errorMessage = '';

		try {
			const res = await fetch('/api/topup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ amount: topUpAmount })
			});

			const result = await res.json();

			if (!res.ok) {
				throw new Error(result.error || 'Terjadi kesalahan saat top up');
			}

			showQrisModal = false;

			alert('Top Up Berhasil! (Mode Simulasi)');
			window.location.reload();
		} catch (error: any) {
			errorMessage = error.message;
		} finally {
			isLoading = false;
		}
	}
</script>

<svelte:head>
	<title>Dompet Saya - AntarLaundry</title>
</svelte:head>

<div class="mx-auto max-w-4xl p-6">
	<div class="mb-8">
		<h1 class="text-2xl font-bold text-surface-900">Keuangan</h1>
		<p class="mt-1 text-surface-500">Kelola saldo dan lihat riwayat transaksi Anda.</p>
	</div>

	<div
		class="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-blue-600 p-6 text-white shadow-lg md:flex-row"
	>
		<div>
			<p class="font-medium text-blue-100">Saldo Saya</p>
			<h2 class="mt-1 text-3xl font-bold">{formatCurrency(wallet.balance)}</h2>
		</div>
		<button
			onclick={() => (showTopUpModal = true)}
			class="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-600 shadow-sm transition-colors hover:bg-blue-50"
		>
			<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 6v6m0 0v6m0-6h6m-6 0H6"
				></path>
			</svg>
			Top Up Saldo
		</button>
	</div>

	<div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
		<h3 class="mb-4 text-lg font-bold text-surface-900">Riwayat Transaksi</h3>

		{#if transactions.length === 0}
			<div class="py-10 text-center text-surface-500">Belum ada transaksi.</div>
		{:else}
			<div class="space-y-4">
				{#each transactions as tx}
					<div
						class="flex items-center justify-between rounded-xl border border-surface-100 p-4 transition-colors hover:bg-surface-50"
					>
						<div class="flex items-center gap-4">
							<div
								class="flex h-10 w-10 items-center justify-center rounded-full
                {tx.type === 'TOP_UP' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}"
							>
								{#if tx.type === 'TOP_UP'}
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4v16m8-8H4"
										></path></svg
									>
								{:else}
									<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M20 12H4"
										></path></svg
									>
								{/if}
							</div>
							<div>
								<p class="font-bold text-surface-900">
									{tx.type === 'TOP_UP' ? 'Top Up Saldo' : 'Pembayaran Laundry'}
								</p>
								<div class="flex items-center gap-2 text-sm text-surface-500">
									<span>{formatDate(tx.createdAt)}</span>
									{#if tx.status === 'SUCCESS'}
										<span
											class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
											>Berhasil</span
										>
									{:else if tx.status === 'PENDING'}
										<span
											class="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700"
											>Pending</span
										>
									{:else}
										<span
											class="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700"
											>Gagal</span
										>
									{/if}
								</div>
							</div>
						</div>
						<div class="text-right">
							<p class="font-bold {tx.type === 'TOP_UP' ? 'text-green-600' : 'text-surface-900'}">
								{tx.type === 'TOP_UP' ? '+' : '-'}
								{formatCurrency(tx.amount)}
							</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

{#if showTopUpModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div class="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
			<div class="flex items-center justify-between border-b border-surface-100 p-6">
				<h3 class="text-lg font-bold text-surface-900">Top Up Saldo</h3>
				<button
					onclick={() => (showTopUpModal = false)}
					class="text-surface-400 hover:text-surface-600"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path></svg
					>
				</button>
			</div>

			<div class="space-y-6 p-6">
				{#if errorMessage}
					<div class="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
						{errorMessage}
					</div>
				{/if}

				<div>
					<label class="mb-3 block text-sm font-medium text-surface-700">Pilih Nominal</label>
					<div class="grid grid-cols-2 gap-3">
						{#each presetAmounts as preset}
							<button
								onclick={() => selectPreset(preset)}
								class="rounded-xl border px-4 py-3 font-medium transition-colors
                  {topUpAmount === preset
									? 'border-blue-600 bg-blue-50 text-blue-700'
									: 'border-surface-200 text-surface-600 hover:border-blue-300'}"
							>
								{formatCurrency(preset)}
							</button>
						{/each}
					</div>
				</div>

				<div>
					<label class="mb-2 block text-sm font-medium text-surface-700"
						>Atau masukkan nominal lain</label
					>
					<div class="relative">
						<span class="absolute top-1/2 left-4 -translate-y-1/2 font-medium text-surface-500"
							>Rp</span
						>
						<input
							type="text"
							bind:value={customAmount}
							oninput={handleCustomAmountInput}
							class="w-full rounded-xl border border-surface-200 py-3 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							placeholder="Minimal 10.000"
						/>
					</div>
				</div>

				<button
					onclick={showQris}
					disabled={isLoading || topUpAmount < 10000}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-4 font-bold text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
				>
					{#if isLoading}
						<svg class="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"
							><circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle><path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path></svg
						>
						Memproses...
					{:else}
						Lanjutkan Pembayaran
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}

{#if showQrisModal}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
		<div class="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-2xl">
			<!-- Header -->
			<div class="bg-blue-600 p-6 text-center text-white relative">
				<button
					onclick={() => (showQrisModal = false)}
					class="absolute left-4 top-6 text-blue-100 hover:text-white"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
					</svg>
				</button>
				<h3 class="text-xl font-bold">Pembayaran QRIS</h3>
				<p class="text-blue-100 mt-1 text-sm">Top Up Antar Laundry</p>
			</div>

			<div class="p-8 text-center bg-gray-50">
				<!-- QR Code Wrapper -->
				<div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 inline-block">
					<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=QRIS_SIMULASI_{topUpAmount}" alt="QRIS" class="w-48 h-48 mx-auto mix-blend-multiply" />
				</div>

				<div class="mb-2 text-sm text-surface-500 font-medium">Total Pembayaran</div>
				<div class="text-3xl font-black text-blue-600 mb-6">{formatCurrency(topUpAmount)}</div>

				<button
					onclick={handleTopUp}
					disabled={isLoading}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-bold text-white transition-colors hover:bg-blue-700 shadow-md shadow-blue-500/20 disabled:opacity-50"
				>
					{#if isLoading}
						<svg class="h-5 w-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
							<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
							<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Memproses...
					{:else}
						Simulasikan Bayar Berhasil
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
