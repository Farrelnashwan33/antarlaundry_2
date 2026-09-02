<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let { form } = $props();
	let loading = $state(false);
	let success = $derived(form?.success || false);

	// Default position based on query param if available
	let selectedPosition = $state($page.url.searchParams.get('role') === 'cs' ? 'CS' : 'RIDER');
</script>

<svelte:head>
	<title>Formulir Lamaran Kerja - Antar Laundry</title>
</svelte:head>

<section class="min-h-screen bg-surface-50 py-24">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 text-center">
			<h1 class="mb-4 text-3xl font-bold text-surface-900 md:text-4xl">
				Formulir Pendaftaran Karir
			</h1>
			<p class="text-surface-600">
				Bergabunglah dengan tim operasional & kesuksesan pelanggan Antar Laundry.
			</p>
		</div>

		<div class="rounded-3xl border border-surface-200 bg-white p-8 shadow-sm md:p-12">
			{#if success}
				<div class="py-12 text-center">
					<div
						class="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600"
					>
						✅
					</div>
					<h2 class="mb-2 text-2xl font-bold text-surface-900">Lamaran Berhasil Dikirim!</h2>
					<p class="mb-8 text-surface-600">
						Terima kasih telah melamar. Tim rekrutmen kami akan meninjau profil Anda dan menghubungi
						Anda melalui Email atau WhatsApp dalam waktu 2x24 Jam.
					</p>
					<a
						href="/careers"
						class="inline-block rounded-xl bg-primary px-8 py-3 font-medium text-white transition hover:bg-primary-hover"
						>Kembali ke Karir</a
					>
				</div>
			{:else}
				{#if form?.error}
					<div class="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
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
							success = form?.success || false;
						};
					}}
					class="space-y-8"
				>
					<!-- Section 1: Basic Details -->
					<div>
						<div class="mb-4 flex items-center gap-3">
							<span
								class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
								>1</span
							>
							<h3
								class="flex-grow border-b border-surface-200 pb-2 text-lg font-bold text-surface-900"
							>
								Informasi Dasar
							</h3>
						</div>

						<div class="grid grid-cols-1 gap-6 pl-11 md:grid-cols-2">
							<div class="space-y-2">
								<label for="fullName" class="text-sm font-medium text-surface-700"
									>Nama Lengkap Sesuai KTP *</label
								>
								<input
									type="text"
									id="fullName"
									name="fullName"
									required
									class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
									placeholder="Masukkan nama lengkap"
								/>
							</div>

							<div class="space-y-2">
								<label for="position" class="text-sm font-medium text-surface-700"
									>Posisi yang Dilamar *</label
								>
								<select
									id="position"
									name="position"
									bind:value={selectedPosition}
									required
									class="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								>
									<option value="RIDER">Kurir Operasional (Rider)</option>
									<option value="CS">Customer Success Staff</option>
								</select>
							</div>

							<div class="space-y-2">
								<label for="dob" class="text-sm font-medium text-surface-700">Tanggal Lahir</label>
								<input
									type="date"
									id="dob"
									name="dob"
									class="w-full rounded-xl border border-surface-300 px-4 py-3 text-surface-700 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								/>
							</div>

							<div class="space-y-2">
								<span class="mb-2 block text-sm font-medium text-surface-700">Jenis Kelamin</span>
								<div class="mt-3 flex items-center gap-6">
									<label class="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="gender"
											value="Laki-laki"
											class="h-4 w-4 text-primary focus:ring-primary"
										/>
										<span class="text-surface-700">Laki-laki</span>
									</label>
									<label class="flex cursor-pointer items-center gap-2">
										<input
											type="radio"
											name="gender"
											value="Perempuan"
											class="h-4 w-4 text-primary focus:ring-primary"
										/>
										<span class="text-surface-700">Perempuan</span>
									</label>
								</div>
							</div>
						</div>
					</div>

					<!-- Section 2: Contact Details -->
					<div>
						<div class="mb-4 flex items-center gap-3">
							<span
								class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
								>2</span
							>
							<h3
								class="flex-grow border-b border-surface-200 pb-2 text-lg font-bold text-surface-900"
							>
								Detail Kontak
							</h3>
						</div>

						<div class="grid grid-cols-1 gap-6 pl-11 md:grid-cols-2">
							<div class="space-y-2">
								<label for="email" class="text-sm font-medium text-surface-700"
									>Alamat Email Aktif *</label
								>
								<input
									type="email"
									id="email"
									name="email"
									required
									class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
									placeholder="email@contoh.com"
								/>
							</div>

							<div class="space-y-2">
								<label for="phone" class="text-sm font-medium text-surface-700"
									>Nomor WhatsApp *</label
								>
								<input
									type="tel"
									id="phone"
									name="phone"
									required
									class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
									placeholder="08123456789"
								/>
							</div>

							<div class="space-y-2 md:col-span-2">
								<label for="address" class="text-sm font-medium text-surface-700"
									>Alamat Domisili Lengkap</label
								>
								<textarea
									id="address"
									name="address"
									rows="3"
									class="w-full resize-none rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
									placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Selatan..."></textarea>
							</div>
						</div>
					</div>

					<!-- Section 3: Education & Background -->
					<div>
						<div class="mb-4 flex items-center gap-3">
							<span
								class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
								>3</span
							>
							<h3
								class="flex-grow border-b border-surface-200 pb-2 text-lg font-bold text-surface-900"
							>
								Pendidikan Terakhir
							</h3>
						</div>

						<div class="grid grid-cols-1 gap-6 pl-11 md:grid-cols-2">
							<div class="space-y-2">
								<label for="educationDegree" class="text-sm font-medium text-surface-700"
									>Tingkat Pendidikan</label
								>
								<select
									id="educationDegree"
									name="educationDegree"
									class="w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-surface-700 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								>
									<option value="">- Pilih Tingkat -</option>
									<option value="SMA/SMK">SMA / SMK Sederajat</option>
									<option value="D3">Diploma 3 (D3)</option>
									<option value="S1">Sarjana (S1)</option>
								</select>
							</div>

							<div class="space-y-2">
								<label for="educationSchool" class="text-sm font-medium text-surface-700"
									>Nama Institusi / Sekolah</label
								>
								<input
									type="text"
									id="educationSchool"
									name="educationSchool"
									class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
									placeholder="Contoh: Universitas Indonesia / SMAN 1"
								/>
							</div>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="mt-8 border-t border-surface-200 pt-8">
						<button
							type="submit"
							disabled={loading}
							class="w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-white shadow-md shadow-orange-500/20 transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70 md:mx-auto md:block md:w-auto md:px-12"
						>
							{loading ? 'Menyimpan...' : 'Kirim Pendaftaran'}
						</button>
						<p class="mt-4 text-center text-xs text-surface-500">
							Dengan mengeklik Kirim Pendaftaran, Anda menyetujui pemrosesan data untuk keperluan
							seleksi karyawan.
						</p>
					</div>
				</form>
			{/if}
		</div>
	</div>
</section>
