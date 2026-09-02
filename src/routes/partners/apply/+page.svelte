<script lang="ts">
	// Formulir akan dikirim langsung ke email menggunakan formsubmit.co
	// Tidak perlu endpoint server khusus
</script>

<svelte:head>
	<title>Formulir Kemitraan - Antar Laundry</title>
</svelte:head>

<section class="min-h-screen bg-surface-50 py-24">
	<div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
		<div class="mb-10 text-center">
			<h1 class="mb-4 text-3xl font-bold text-surface-900 md:text-4xl">
				Formulir Kemitraan Vendor
			</h1>
			<p class="text-surface-600">
				Bergabunglah sebagai vendor cuci berstandar tinggi untuk Antar Laundry.
			</p>
		</div>

		<div class="rounded-3xl border border-surface-200 bg-white p-8 shadow-sm md:p-12">
			<!-- Endpoint FormSubmit diarahkan ke email yang diminta -->
			<form
				action="https://formsubmit.co/haloantarlaundry@gmail.com"
				method="POST"
				class="space-y-8"
			>
				<!-- Konfigurasi FormSubmit -->
				<!-- Ganti URL ini dengan URL production Anda nanti jika sudah di-hosting -->
				<input type="hidden" name="_next" value="http://localhost:5173/partners?success=true" />
				<input type="hidden" name="_subject" value="PENDAFTARAN MITRA VENDOR BARU" />
				<input type="hidden" name="_captcha" value="false" />
				<input type="hidden" name="_template" value="table" />

				<!-- Bagian 1: Informasi Usaha -->
				<div>
					<div class="mb-4 flex items-center gap-3">
						<span
							class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
							>1</span
						>
						<h3
							class="flex-grow border-b border-surface-200 pb-2 text-lg font-bold text-surface-900"
						>
							Informasi Usaha
						</h3>
					</div>

					<div class="grid grid-cols-1 gap-6 pl-11">
						<div class="space-y-2">
							<label for="businessName" class="text-sm font-medium text-surface-700"
								>Nama Laundry / Usaha <span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="businessName"
								name="Nama Usaha"
								required
								class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								placeholder="Contoh: Berkah Laundry"
							/>
						</div>

						<div class="space-y-2">
							<label for="address" class="text-sm font-medium text-surface-700"
								>Alamat Lengkap Workshop <span class="text-red-500">*</span></label
							>
							<textarea
								id="address"
								name="Alamat Workshop"
								required
								rows="3"
								class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								placeholder="Masukkan alamat lengkap workshop Anda..."></textarea>
						</div>
					</div>
				</div>

				<!-- Bagian 2: Detail Kontak -->
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
							<label for="ownerName" class="text-sm font-medium text-surface-700"
								>Nama Pemilik <span class="text-red-500">*</span></label
							>
							<input
								type="text"
								id="ownerName"
								name="Nama Pemilik"
								required
								class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								placeholder="Nama lengkap Anda"
							/>
						</div>

						<div class="space-y-2">
							<label for="phone" class="text-sm font-medium text-surface-700"
								>Nomor WhatsApp <span class="text-red-500">*</span></label
							>
							<input
								type="tel"
								id="phone"
								name="WhatsApp"
								required
								class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								placeholder="08123456789"
							/>
						</div>

						<div class="space-y-2 md:col-span-2">
							<label for="email" class="text-sm font-medium text-surface-700"
								>Alamat Email Aktif <span class="text-red-500">*</span></label
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
					</div>
				</div>

				<!-- Bagian 3: Kapasitas & Fasilitas -->
				<div>
					<div class="mb-4 flex items-center gap-3">
						<span
							class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white"
							>3</span
						>
						<h3
							class="flex-grow border-b border-surface-200 pb-2 text-lg font-bold text-surface-900"
						>
							Kapasitas & Fasilitas
						</h3>
					</div>

					<div class="grid grid-cols-1 gap-6 pl-11 md:grid-cols-2">
						<div class="space-y-2">
							<label for="capacity" class="text-sm font-medium text-surface-700"
								>Kapasitas Cuci (Kg/Hari) <span class="text-red-500">*</span></label
							>
							<input
								type="number"
								id="capacity"
								name="Kapasitas (Kg per Hari)"
								required
								min="10"
								class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								placeholder="Misal: 100"
							/>
						</div>

						<div class="space-y-2">
							<label for="machines" class="text-sm font-medium text-surface-700"
								>Jml. Mesin Cuci/Pengering <span class="text-red-500">*</span></label
							>
							<input
								type="number"
								id="machines"
								name="Jumlah Mesin Komersial"
								required
								min="1"
								class="w-full rounded-xl border border-surface-300 px-4 py-3 transition outline-none focus:border-primary focus:ring-2 focus:ring-primary"
								placeholder="Misal: 5"
							/>
						</div>
					</div>
				</div>

				<div class="pt-6 pl-11">
					<button
						type="submit"
						class="w-full transform rounded-xl bg-primary py-4 text-lg font-bold text-white shadow-lg shadow-primary/30 transition hover:-translate-y-1 hover:bg-primary-hover"
					>
						Kirim Pendaftaran
					</button>
				</div>
			</form>
		</div>
	</div>
</section>
