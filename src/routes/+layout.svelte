<script lang="ts">
  import './layout.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import LiveChat from '$lib/components/LiveChat.svelte';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let { children } = $props();
  let showLang = $state(false);
  let selectedLang = $state('ID');
  
  const languages = [
    { code: 'ID', label: 'Indonesia (ID)' },
    { code: 'EN', label: 'English (EN)' },
    { code: 'ES', label: 'Español (ES)' },
    { code: 'FR', label: 'Français (FR)' },
    { code: 'JA', label: '日本語 (JA)' },
    { code: 'ZH', label: '中文 (ZH)' },
    { code: 'AR', label: 'العربية (AR)' }
  ];

  onMount(() => {
    const match = document.cookie.match(/googtrans=\/id\/([^;]+)/) || document.cookie.match(/googtrans=\/auto\/([^;]+)/);
    if (match && match[1]) {
      selectedLang = match[1].toUpperCase();
    }
    
    const gtDiv = document.createElement('div');
    gtDiv.id = 'google_translate_element';
    document.body.appendChild(gtDiv);

    (window as any).googleTranslateElementInit = function() {
      new (window as any).google.translate.TranslateElement({
        pageLanguage: 'id',
        autoDisplay: false
      }, 'google_translate_element');
    };

    const gtScript = document.createElement('script');
    gtScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(gtScript);
  });

  function changeLanguage(langCode: string) {
    selectedLang = langCode;
    showLang = false;
    
    if (langCode === 'ID') {
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${location.hostname}; path=/;`;
    } else {
      const code = langCode.toLowerCase();
      document.cookie = `googtrans=/id/${code}; path=/`;
      document.cookie = `googtrans=/id/${code}; domain=.${location.hostname}; path=/`;
    }
    
    window.location.reload();
  }
</script>

<svelte:head>
  <title>Antar Laundry - Solusi Laundry Antar Jemput</title>
  <meta name="description" content="Aplikasi layanan antar jemput laundry modern, cepat, dan terpercaya." />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen flex flex-col bg-[var(--bg-color)]">
  {#if !$page.url.pathname.startsWith('/courier') && !$page.url.pathname.startsWith('/admin') && !$page.url.pathname.startsWith('/dashboard')}
    <Navbar />
  {/if}
  
  <main class="flex-grow flex flex-col min-w-0 w-full {($page.url.pathname.startsWith('/courier') || $page.url.pathname.startsWith('/admin') || $page.url.pathname.startsWith('/dashboard')) ? '' : 'pt-16 pb-20 md:pb-0'}">
    {@render children()}
  </main>

  {#if !$page.url.pathname.startsWith('/courier') && !$page.url.pathname.startsWith('/admin') && !$page.url.pathname.startsWith('/dashboard')}
    <footer class="bg-gradient-to-br from-primary-600 to-primary-900 text-primary-100 py-16 relative overflow-hidden">
      
      <!-- Optional subtle glow effect -->
      <div class="absolute top-0 right-1/4 w-96 h-96 bg-primary-400 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <!-- Brand Column -->
          <div class="md:col-span-4">
            <div class="flex items-center gap-3 mb-6 text-white">
              <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-primary-700 font-bold text-2xl shadow-sm">
                A
              </div>
              <span class="font-bold text-2xl tracking-tight">AntarLaundry</span>
            </div>
            <p class="text-primary-100/90 leading-relaxed mb-8 text-base">
              Memberdayakan keluarga dan pekerja sibuk di seluruh Indonesia dengan layanan laundry yang cepat, modern, dan tanpa repot. Ciptakan waktu luang Anda bersama kami.
            </p>
            
            <div class="space-y-4 text-base text-primary-100/90">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>haloantarlaundry@gmail.com</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>1-800-ANTAR</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          <!-- Links Columns -->
          <div class="md:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <!-- Column 1 -->
            <div>
              <h4 class="text-white font-semibold mb-6 text-lg">Layanan</h4>
              <ul class="space-y-4 text-base text-primary-100/80">
                <li><a href="#services" class="hover:text-white transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary-400"></span> Cuci Komplit</a></li>
                <li><a href="#services" class="hover:text-white transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary-400"></span> Cuci Kering</a></li>
                <li><a href="#services" class="hover:text-white transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary-400"></span> Setrika Saja</a></li>
                <li><a href="#services" class="hover:text-white transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary-400"></span> Cuci Sepatu</a></li>
                <li><a href="#services" class="hover:text-white transition-colors flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-primary-400"></span> Langganan</a></li>
              </ul>
            </div>
            
            <!-- Column 2 -->
            <div>
              <h4 class="text-white font-semibold mb-6 text-lg">Perusahaan</h4>
              <ul class="space-y-4 text-base text-primary-100/80">
                <li><a href="/about" class="hover:text-white transition-colors">Tentang Kami</a></li>
                <li><a href="/careers" class="hover:text-white transition-colors">Karir</a></li>
                <li><a href="/press" class="hover:text-white transition-colors">Pers & Media</a></li>
                <li><a href="/investor" class="hover:text-white transition-colors">Investor</a></li>
                <li><a href="/blog" class="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <!-- Column 3 -->
            <div>
              <h4 class="text-white font-semibold mb-6 text-lg">Bantuan</h4>
              <ul class="space-y-4 text-base text-primary-100/80">
                <li><a href="/help" class="hover:text-white transition-colors">Pusat Bantuan</a></li>
                <li><a href="/docs" class="hover:text-white transition-colors">Dokumentasi</a></li>
                <li><a href="/status" class="hover:text-white transition-colors">Status Sistem</a></li>
                <li><a href="/contact" class="hover:text-white transition-colors">Hubungi CS</a></li>
                <li><a href="/community" class="hover:text-white transition-colors">Komunitas</a></li>
              </ul>
            </div>

            <!-- Column 4 -->
            <div>
              <h4 class="text-white font-semibold mb-6 text-lg">Sumber Daya</h4>
              <ul class="space-y-4 text-base text-primary-100/80">
                <li><a href="/partners" class="hover:text-white transition-colors">Panduan Mitra</a></li>
                <li><a href="/api-ref" class="hover:text-white transition-colors">Referensi API</a></li>
                <li><a href="/changelog" class="hover:text-white transition-colors">Changelog</a></li>
                <li><a href="/download" class="hover:text-white transition-colors">Unduh Aplikasi</a></li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Bottom Bar -->
        <!-- Bottom Bar -->
        <div class="relative z-10 mt-16 bg-white/5 border border-white/10 rounded-2xl lg:rounded-full px-6 py-5 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-sm">
          <div class="text-primary-100/70 text-center lg:text-left shrink-0">
            <p>&copy; {new Date().getFullYear()} AntarLaundry Platform. Hak Cipta Dilindungi.</p>
            <p class="mt-1">Dibuat dengan ❤️ untuk masa depan laundry</p>
          </div>
          
          <div class="flex flex-wrap justify-center items-center gap-x-4 gap-y-3 md:gap-x-6 text-primary-100/80">
            <a href="/privacy-policy" class="hover:text-white transition-colors whitespace-nowrap">Kebijakan Privasi</a>
            <a href="/terms-of-service" class="hover:text-white transition-colors whitespace-nowrap">Syarat Layanan</a>
            <a href="/cookie-policy" class="hover:text-white transition-colors whitespace-nowrap">Kebijakan Cookie</a>
            <a href="/compliance" class="hover:text-white transition-colors whitespace-nowrap">Kepatuhan</a>
            <a href="/security" class="hover:text-white transition-colors whitespace-nowrap">Keamanan</a>
            <a href="/licenses" class="hover:text-white transition-colors whitespace-nowrap">Lisensi</a>
          </div>

          <div class="shrink-0 relative">
            <button onclick={() => showLang = !showLang} class="bg-white/10 hover:bg-white/20 transition-colors border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2 text-white font-medium whitespace-nowrap">
              <svg class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
              {languages.find(l => l.code === selectedLang)?.label.split(' ')[0]} ({selectedLang})
            </button>
            
            {#if showLang}
              <div class="absolute bottom-full right-0 mb-3 w-48 bg-surface-900 rounded-xl shadow-2xl border border-surface-700 py-2 text-surface-200 z-50 overflow-hidden">
                {#each languages as lang}
                  <button 
                    onclick={() => changeLanguage(lang.code)} 
                    class="w-full text-left px-4 py-2 hover:bg-surface-800 hover:text-white transition-colors font-medium flex items-center justify-between"
                  >
                    <span>{lang.label}</span>
                    {#if selectedLang === lang.code}
                      <svg class="w-4 h-4 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                    {/if}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        </div>
        
      </div>
    </footer>
  {/if}

  <LiveChat />
</div>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }
</style>
