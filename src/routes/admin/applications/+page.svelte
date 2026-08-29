<script lang="ts">
  import type { PageData } from './$types';
  
  let { data }: { data: PageData } = $props();
  
  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };
</script>

<svelte:head>
  <title>Data Pelamar - Admin Antar Laundry</title>
</svelte:head>

<div class="px-6 py-8">
  <div class="mb-8 flex justify-between items-center">
    <div>
      <h1 class="text-3xl font-bold text-surface-900">Data Pelamar Kerja</h1>
      <p class="text-surface-500 mt-1">Daftar kandidat Kurir Operasional & Customer Success.</p>
    </div>
  </div>

  <div class="bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surface-50 border-b border-surface-200 text-sm font-semibold text-surface-600 uppercase tracking-wider">
            <th class="p-4 pl-6">Nama Kandidat</th>
            <th class="p-4">Posisi</th>
            <th class="p-4">Kontak</th>
            <th class="p-4">Status & Waktu</th>
            <th class="p-4 pr-6">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-surface-200">
          {#each data.applications as app}
            <tr class="hover:bg-surface-50 transition-colors">
              <td class="p-4 pl-6">
                <div class="font-medium text-surface-900">{app.fullName}</div>
                <div class="text-xs text-surface-500">{app.gender || '-'}</div>
              </td>
              <td class="p-4">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {app.position === 'CS' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}">
                  {app.position === 'CS' ? 'Customer Success' : 'Kurir (Rider)'}
                </span>
              </td>
              <td class="p-4">
                <div class="text-sm text-surface-900">{app.phone}</div>
                <div class="text-xs text-surface-500">{app.email}</div>
              </td>
              <td class="p-4">
                <div class="flex items-center gap-2 mb-1">
                  <span class="w-2 h-2 rounded-full {app.status === 'PENDING' ? 'bg-yellow-400' : app.status === 'ACCEPTED' ? 'bg-green-500' : 'bg-red-500'}"></span>
                  <span class="text-sm font-medium text-surface-900">{app.status}</span>
                </div>
                <div class="text-xs text-surface-500">
                  {formatDate(app.createdAt)}
                </div>
              </td>
              <td class="p-4 pr-6">
                <a href="/admin/applications/{app.id}" class="inline-flex items-center justify-center px-4 py-2 bg-surface-100 hover:bg-surface-200 text-surface-700 rounded-lg text-sm font-medium transition-colors">
                  Tinjau & Validasi
                </a>
              </td>
            </tr>
          {:else}
            <tr>
              <td colspan="6" class="p-12 text-center text-surface-500">
                <div class="text-4xl mb-4">📄</div>
                <p>Belum ada pelamar kerja yang mendaftar.</p>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
