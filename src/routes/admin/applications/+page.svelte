<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const formatDate = (dateString: Date) => {
		return new Date(dateString).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>Data Pelamar - Admin Antar Laundry</title>
</svelte:head>

<div class="px-6 py-8">
	<div class="mb-8 flex items-center justify-between">
		<div>
			<h1 class="text-3xl font-bold text-surface-900">Data Pelamar Kerja</h1>
			<p class="mt-1 text-surface-500">Daftar kandidat Go Laundry & Customer Success.</p>
		</div>
	</div>

	<div class="overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm">
		<div class="overflow-x-auto">
			<table class="w-full border-collapse text-left">
				<thead>
					<tr
						class="border-b border-surface-200 bg-surface-50 text-sm font-semibold tracking-wider text-surface-600 uppercase"
					>
						<th class="p-4 pl-6">Nama Kandidat</th>
						<th class="p-4">Posisi</th>
						<th class="p-4">Kontak</th>
						<th class="p-4">Status & Waktu</th>
						<th class="p-4 pr-6">Aksi</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-surface-200">
					{#each data.applications as app}
						<tr class="transition-colors hover:bg-surface-50">
							<td class="p-4 pl-6">
								<div class="font-medium text-surface-900">{app.fullName}</div>
								<div class="text-xs text-surface-500">{app.gender || '-'}</div>
							</td>
							<td class="p-4">
								<span
									class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {app.position ===
									'CS'
										? 'bg-blue-50 text-blue-700'
										: 'bg-orange-50 text-orange-700'}"
								>
									{app.position === 'CS' ? 'Customer Success' : 'Go Laundry (Mitra)'}
								</span>
							</td>
							<td class="p-4">
								<div class="text-sm text-surface-900">{app.phone}</div>
								<div class="text-xs text-surface-500">{app.email}</div>
							</td>
							<td class="p-4">
								<div class="mb-1 flex items-center gap-2">
									<span
										class="h-2 w-2 rounded-full {app.status === 'PENDING'
											? 'bg-yellow-400'
											: app.status === 'ACCEPTED'
												? 'bg-green-500'
												: 'bg-red-500'}"
									></span>
									<span class="text-sm font-medium text-surface-900">{app.status}</span>
								</div>
								<div class="text-xs text-surface-500">
									{formatDate(app.createdAt)}
								</div>
							</td>
							<td class="p-4 pr-6">
								<a
									href="/admin/applications/{app.id}"
									class="inline-flex items-center justify-center rounded-lg bg-surface-100 px-4 py-2 text-sm font-medium text-surface-700 transition-colors hover:bg-surface-200"
								>
									Tinjau & Validasi
								</a>
							</td>
						</tr>
					{:else}
						<tr>
							<td colspan="6" class="p-12 text-center text-surface-500">
								<div class="mb-4 text-4xl">📄</div>
								<p>Belum ada pelamar kerja yang mendaftar.</p>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
