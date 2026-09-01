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
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };
</script>

<svelte:head>
  <title>Detail Pelamar: {application.fullName} - Admin Antar Laundry</title>
</svelte:head>

<div class="px-6 py-8 max-w-4xl mx-auto">
  <!-- Back Button & Header -->
  <div class="mb-8">
    <a href="/admin/applications" class="inline-flex items-center text-sm font-medium text-surface-500 hover:text-primary mb-4 transition">
      <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      Kembali ke Daftar Pelamar
    </a>
    
    <div class="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
      <div>
        <h1 class="text-3xl font-bold text-surface-900">{application.fullName}</h1>
        <p class="text-surface-600 mt-1 text-lg">Melamar sebagai: <span class="font-bold {application.position === 'CS' ? 'text-blue-600' : 'text-orange-600'}">{application.position === 'CS' ? 'Customer Success Staff' : 'Go Laundry (Mitra)'}</span></p>
      </div>
      
      <div class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold {application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
        Status: {application.status === 'PENDING' ? 'MENUNGGU VALIDASI' : application.status === 'ACCEPTED' ? 'DITERIMA' : 'DITOLAK'}
      </div>
    </div>
  </div>

  <!-- Detail Cards -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
    <!-- Profil Singkat -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-200">
      <h3 class="text-lg font-bold text-surface-900 border-b border-surface-100 pb-3 mb-4">Profil Singkat</h3>
      <dl class="space-y-4">
        <div>
          <dt class="text-sm font-medium text-surface-500">Jenis Kelamin</dt>
          <dd class="mt-1 text-sm text-surface-900 font-medium">{application.gender || '-'}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-surface-500">Tanggal Lahir</dt>
          <dd class="mt-1 text-sm text-surface-900 font-medium">{formatDate(application.dob)}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-surface-500">Pendidikan Terakhir</dt>
          <dd class="mt-1 text-sm text-surface-900 font-medium">
            {application.educationDegree || '-'} <br>
            <span class="text-surface-600 font-normal">{application.educationSchool || ''}</span>
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-surface-500">Tanggal Melamar</dt>
          <dd class="mt-1 text-sm text-surface-900 font-medium">{formatDate(application.createdAt)}</dd>
        </div>
      </dl>
    </div>

    <!-- Kontak & Alamat -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-surface-200">
      <h3 class="text-lg font-bold text-surface-900 border-b border-surface-100 pb-3 mb-4">Kontak & Alamat</h3>
      <dl class="space-y-4">
        <div>
          <dt class="text-sm font-medium text-surface-500">Alamat Email</dt>
          <dd class="mt-1 text-sm text-surface-900 font-medium">
            <a href="mailto:{application.email}" class="text-primary hover:underline">{application.email}</a>
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-surface-500">Nomor WhatsApp</dt>
          <dd class="mt-1 text-sm text-surface-900 font-medium flex items-center gap-2">
            {application.phone}
            <span class="inline-flex w-5 h-5 bg-green-500 text-white rounded-full items-center justify-center text-xs">WA</span>
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-surface-500">Alamat Domisili</dt>
          <dd class="mt-1 text-sm text-surface-900 font-medium">{application.address || 'Tidak disertakan'}</dd>
        </div>
      </dl>
    </div>
  </div>

  <!-- Action Validasi -->
  <div class="bg-surface-100 p-8 rounded-3xl border border-surface-200">
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-surface-900 mb-2">Validasi Kelayakan Kandidat</h2>
      <p class="text-surface-600">Tinjau profil kandidat. Keputusan yang Anda buat akan diperbarui di database.</p>
    </div>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <form method="POST" action="?/reject" use:enhance={() => { loadingReject = true; return async ({ update }) => { await update(); loadingReject = false; } }}>
        <button 
          type="submit" 
          disabled={loadingReject || loadingAccept || application.status === 'REJECTED'}
          class="w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2
          {application.status === 'REJECTED' ? 'bg-surface-300 text-surface-500 cursor-not-allowed' : 'bg-white border-2 border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50'}"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          {loadingReject ? 'Memproses...' : 'Tolak Kandidat'}
        </button>
      </form>

      <form method="POST" action="?/accept" use:enhance={() => { loadingAccept = true; return async ({ update }) => { await update(); loadingAccept = false; } }}>
        <button 
          type="submit" 
          disabled={loadingAccept || loadingReject}
          class="w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-white shadow-lg shadow-green-500/30
          bg-green-500 hover:bg-green-600 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          {loadingAccept ? 'Membuka WhatsApp...' : 'Terima & Kirim WhatsApp'}
        </button>
      </form>
    </div>
    
    <p class="text-center text-xs text-surface-500 mt-6">
      *Catatan: Mengklik "Terima" akan otomatis merubah status di database dan membuka jendela WhatsApp Web yang sudah berisi draf pesan panggilan kerja.
    </p>
  </div>
</div>
