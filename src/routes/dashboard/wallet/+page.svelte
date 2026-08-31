<script lang="ts">
  let { data } = $props();
  let { wallet, transactions } = data;
  
  let showTopUpModal = false;
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

  async function handleTopUp() {
    if (topUpAmount < 10000) {
      errorMessage = 'Minimal top up adalah Rp10.000';
      return;
    }

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

      showTopUpModal = false;

      // Trigger Midtrans Snap
      if (window.snap) {
        window.snap.pay(result.token, {
          onSuccess: function(result: any) {
            window.location.reload();
          },
          onPending: function(result: any) {
            window.location.reload();
          },
          onError: function(result: any) {
            alert('Pembayaran gagal!');
          },
          onClose: function() {
            // Optional: Handle if user closed the popup
          }
        });
      } else {
        alert('Midtrans snap client tidak ditemukan');
      }
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

<div class="p-6 max-w-4xl mx-auto">
  <div class="mb-8">
    <h1 class="text-2xl font-bold text-surface-900">Keuangan</h1>
    <p class="text-surface-500 mt-1">Kelola saldo dan lihat riwayat transaksi Anda.</p>
  </div>

  <div class="bg-blue-600 rounded-2xl p-6 text-white shadow-lg mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
    <div>
      <p class="text-blue-100 font-medium">Saldo Saya</p>
      <h2 class="text-3xl font-bold mt-1">{formatCurrency(wallet.balance)}</h2>
    </div>
    <button 
      onclick={() => showTopUpModal = true}
      class="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-2"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
      </svg>
      Top Up Saldo
    </button>
  </div>

  <div class="bg-white rounded-2xl p-6 shadow-sm border border-surface-200">
    <h3 class="text-lg font-bold text-surface-900 mb-4">Riwayat Transaksi</h3>
    
    {#if transactions.length === 0}
      <div class="text-center py-10 text-surface-500">
        Belum ada transaksi.
      </div>
    {:else}
      <div class="space-y-4">
        {#each transactions as tx}
          <div class="flex items-center justify-between p-4 rounded-xl border border-surface-100 hover:bg-surface-50 transition-colors">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center 
                {tx.type === 'TOP_UP' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}">
                {#if tx.type === 'TOP_UP'}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                {:else}
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                {/if}
              </div>
              <div>
                <p class="font-bold text-surface-900">
                  {tx.type === 'TOP_UP' ? 'Top Up Saldo' : 'Pembayaran Laundry'}
                </p>
                <div class="flex gap-2 items-center text-sm text-surface-500">
                  <span>{formatDate(tx.createdAt)}</span>
                  {#if tx.status === 'SUCCESS'}
                    <span class="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">Berhasil</span>
                  {:else if tx.status === 'PENDING'}
                    <span class="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Pending</span>
                  {:else}
                    <span class="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">Gagal</span>
                  {/if}
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold {tx.type === 'TOP_UP' ? 'text-green-600' : 'text-surface-900'}">
                {tx.type === 'TOP_UP' ? '+' : '-'} {formatCurrency(tx.amount)}
              </p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

{#if showTopUpModal}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
      <div class="p-6 border-b border-surface-100 flex items-center justify-between">
        <h3 class="text-lg font-bold text-surface-900">Top Up Saldo</h3>
        <button onclick={() => showTopUpModal = false} class="text-surface-400 hover:text-surface-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <div class="p-6 space-y-6">
        {#if errorMessage}
          <div class="p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium">
            {errorMessage}
          </div>
        {/if}
        
        <div>
          <label class="block text-sm font-medium text-surface-700 mb-3">Pilih Nominal</label>
          <div class="grid grid-cols-2 gap-3">
            {#each presetAmounts as preset}
              <button 
                onclick={() => selectPreset(preset)}
                class="py-3 px-4 rounded-xl border font-medium transition-colors
                  {topUpAmount === preset ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-surface-200 text-surface-600 hover:border-blue-300'}"
              >
                {formatCurrency(preset)}
              </button>
            {/each}
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-surface-700 mb-2">Atau masukkan nominal lain</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500 font-medium">Rp</span>
            <input 
              type="text" 
              bind:value={customAmount}
              oninput={handleCustomAmountInput}
              class="w-full pl-10 pr-4 py-3 rounded-xl border border-surface-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Minimal 10.000"
            />
          </div>
        </div>
        
        <button 
          onclick={handleTopUp}
          disabled={isLoading || topUpAmount < 10000}
          class="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {#if isLoading}
            <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Memproses...
          {:else}
            Lanjutkan Pembayaran
          {/if}
        </button>
      </div>
    </div>
  </div>
{/if}
