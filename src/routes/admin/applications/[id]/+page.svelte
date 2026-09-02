<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let application = $derived(data.application);
	let loadingAccept = $state(false);
	let loadingReject = $state(false);

	const formatDate = (dateString: Date | string | null) => {
		if (!dateString) return '-';
		return new Date(dateString).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>Detail Pelamar: {application.fullName} - Admin Antar Laundry</title>
</svelte:head>

<div class="mx-auto max-w-4xl px-6 py-8">
	<!-- Back Button & Header -->
	<div class="mb-8">
		<a
			href="/admin/applications"
			class="mb-4 inline-flex items-center text-sm font-medium text-surface-500 transition hover:text-primary"
		>
			<svg class="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/></svg
			>
			Kembali ke Daftar Pelamar
		</a>

		<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
			<div>
				<h1 class="text-3xl font-bold text-surface-900">{application.fullName}</h1>
				<p class="mt-1 text-lg text-surface-600">
					Melamar sebagai: <span
						class="font-bold {application.position === 'CS' ? 'text-blue-600' : 'text-orange-600'}"
						>{application.position === 'CS' ? 'Customer Success Staff' : 'Go Laundry (Mitra)'}</span
					>
				</p>
			</div>

			<div
				class="inline-flex items-center rounded-xl px-4 py-2 text-sm font-bold {application.status ===
				'PENDING'
					? 'bg-yellow-100 text-yellow-800'
					: application.status === 'ACCEPTED'
						? 'bg-green-100 text-green-800'
						: 'bg-red-100 text-red-800'}"
			>
				Status: {application.status === 'PENDING'
					? 'MENUNGGU VALIDASI'
					: application.status === 'ACCEPTED'
						? 'DITERIMA'
						: 'DITOLAK'}
			</div>
		</div>
	</div>

	<!-- Detail Cards -->
	<div class="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2">
		<!-- Profil Singkat -->
		<div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 border-b border-surface-100 pb-3 text-lg font-bold text-surface-900">
				Profil Singkat
			</h3>
			<dl class="space-y-4">
				<div>
					<dt class="text-sm font-medium text-surface-500">Jenis Kelamin</dt>
					<dd class="mt-1 text-sm font-medium text-surface-900">{application.gender || '-'}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-surface-500">Tanggal Lahir</dt>
					<dd class="mt-1 text-sm font-medium text-surface-900">{formatDate(application.dob)}</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-surface-500">Pendidikan Terakhir</dt>
					<dd class="mt-1 text-sm font-medium text-surface-900">
						{application.educationDegree || '-'} <br />
						<span class="font-normal text-surface-600">{application.educationSchool || ''}</span>
					</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-surface-500">Tanggal Melamar</dt>
					<dd class="mt-1 text-sm font-medium text-surface-900">
						{formatDate(application.createdAt)}
					</dd>
				</div>
			</dl>
		</div>

		<!-- Kontak & Alamat -->
		<div class="rounded-2xl border border-surface-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 border-b border-surface-100 pb-3 text-lg font-bold text-surface-900">
				Kontak & Alamat
			</h3>
			<dl class="space-y-4">
				<div>
					<dt class="text-sm font-medium text-surface-500">Alamat Email</dt>
					<dd class="mt-1 text-sm font-medium text-surface-900">
						<a href="mailto:{application.email}" class="text-primary hover:underline"
							>{application.email}</a
						>
					</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-surface-500">Nomor WhatsApp</dt>
					<dd class="mt-1 flex items-center gap-2 text-sm font-medium text-surface-900">
						{application.phone}
						<span
							class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white"
							>WA</span
						>
					</dd>
				</div>
				<div>
					<dt class="text-sm font-medium text-surface-500">Alamat Domisili</dt>
					<dd class="mt-1 text-sm font-medium text-surface-900">
						{application.address || 'Tidak disertakan'}
					</dd>
				</div>
			</dl>
		</div>
	</div>

	<!-- Action Validasi -->
	<div class="rounded-3xl border border-surface-200 bg-surface-100 p-8">
		<div class="mb-8 text-center">
			<h2 class="mb-2 text-2xl font-bold text-surface-900">Validasi Kelayakan Kandidat</h2>
			<p class="text-surface-600">
				Tinjau profil kandidat. Keputusan yang Anda buat akan diperbarui di database.
			</p>
		</div>

		<div class="flex flex-col justify-center gap-4 sm:flex-row">
			<form
				method="POST"
				action="?/reject"
				use:enhance={() => {
					loadingReject = true;
					return async ({ update }) => {
						await update();
						loadingReject = false;
					};
				}}
			>
				<button
					type="submit"
					disabled={loadingReject || loadingAccept || application.status === 'REJECTED'}
					class="flex w-full items-center justify-center gap-2 rounded-xl px-8 py-3 font-bold transition sm:w-auto
          {application.status === 'REJECTED'
						? 'cursor-not-allowed bg-surface-300 text-surface-500'
						: 'border-2 border-red-500 bg-white text-red-600 hover:bg-red-50 disabled:opacity-50'}"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/></svg
					>
					{loadingReject ? 'Memproses...' : 'Tolak Kandidat'}
				</button>
			</form>

			<form
				method="POST"
				action="?/accept"
				use:enhance={() => {
					loadingAccept = true;
					return async ({ update }) => {
						await update();
						loadingAccept = false;
					};
				}}
			>
				<button
					type="submit"
					disabled={loadingAccept || loadingReject}
					class="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-8 py-3 font-bold text-white shadow-lg shadow-green-500/30 transition
          hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
				>
					<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/></svg
					>
					{loadingAccept ? 'Membuka WhatsApp...' : 'Terima & Kirim WhatsApp'}
				</button>
			</form>
		</div>

		<p class="mt-6 text-center text-xs text-surface-500">
			*Catatan: Mengklik "Terima" akan otomatis merubah status di database dan membuka jendela
			WhatsApp Web yang sudah berisi draf pesan panggilan kerja.
		</p>
	</div>
</div>
