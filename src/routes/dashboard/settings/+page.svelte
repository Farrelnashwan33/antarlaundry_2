<svelte:head>
	<title>Pengaturan - Antar Laundry</title>
</svelte:head>

<div class="p-6 lg:p-10">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight text-surface-900">Pengaturan</h1>
			<p class="mt-1 text-surface-500">Kelola preferensi akun Anda</p>
		</div>
	</div>
	<div class="mt-6 rounded-3xl border border-surface-200 bg-white p-6 text-left shadow-sm md:p-10">
		<h3 class="mb-6 border-b pb-4 text-xl font-bold text-surface-900">Menu Tambahan</h3>

		<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
			<a
				href="/dashboard/history"
				class="flex items-center gap-4 rounded-2xl border border-surface-100 p-4 transition-colors hover:bg-surface-50"
			>
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
				</div>
				<div>
					<div class="font-bold text-surface-900">Riwayat Transaksi</div>
					<div class="text-xs text-surface-500">Lihat semua transaksi Anda</div>
				</div>
			</a>

			<a
				href="/dashboard/address"
				class="flex items-center gap-4 rounded-2xl border border-surface-100 p-4 transition-colors hover:bg-surface-50"
			>
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
						></path></svg
					>
				</div>
				<div>
					<div class="font-bold text-surface-900">Alamat Saya</div>
					<div class="text-xs text-surface-500">Kelola daftar alamat simpanan</div>
				</div>
			</a>

			<a
				href="/dashboard/promo"
				class="flex items-center gap-4 rounded-2xl border border-surface-100 p-4 transition-colors hover:bg-surface-50"
			>
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
						></path></svg
					>
				</div>
				<div>
					<div class="font-bold text-surface-900">Promo & Voucher</div>
					<div class="text-xs text-surface-500">Klaim promo menarik</div>
				</div>
			</a>

			<a
				href="/dashboard/support"
				class="flex items-center gap-4 rounded-2xl border border-surface-100 p-4 transition-colors hover:bg-surface-50"
			>
				<div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
				</div>
				<div>
					<div class="font-bold text-surface-900">Bantuan</div>
					<div class="text-xs text-surface-500">Hubungi customer service</div>
				</div>
			</a>
		</div>
	</div>

	<div class="mt-6 rounded-3xl border border-surface-200 bg-white p-10 text-center shadow-sm">
		<div class="mb-4 text-6xl opacity-50">⚙️</div>
		<h3 class="mb-2 text-xl font-bold text-surface-900">Pengaturan Lanjutan</h3>
		<p class="text-surface-500">Fitur keamanan dan preferensi lainnya sedang dalam pengembangan.</p>
	</div>

	<!-- Logout form untuk mobile (biasanya ada di sidebar) -->
	<div class="mt-6 md:hidden">
		<form method="POST" action="/logout">
			<button
				class="flex w-full items-center justify-center gap-2 rounded-2xl bg-red-50 px-4 py-4 font-bold text-red-600 transition-colors hover:bg-red-100"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
					></path></svg
				>
				Keluar Akun
			</button>
		</form>
	</div>
</div>
