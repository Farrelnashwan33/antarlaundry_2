<script lang="ts">
  import { page } from '$app/stores';
  import Button from './ui/Button.svelte';

  const navLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Layanan', href: '/#layanan' },
    { name: 'Cara Kerja', href: '/#cara-kerja' },
    { name: 'Kontak', href: '/contact' },
  ];

  let user = $derived($page.data.user);
</script>

<nav class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-surface-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <a href="/" class="flex-shrink-0 flex items-center gap-2">
          <!-- Logo -->
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span class="font-bold text-xl text-surface-900 tracking-tight">Antar<span class="text-primary">Laundry</span></span>
        </a>
        
        <!-- Desktop Nav -->
        <div class="hidden md:ml-10 md:flex md:space-x-8">
          {#each navLinks as link}
            <a 
              href={link.href}
              class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors hover:text-primary { $page.url.pathname === link.href ? 'text-primary border-b-2 border-primary' : 'text-surface-600' }"
            >
              {link.name}
            </a>
          {/each}
        </div>
      </div>

      <div class="hidden md:flex items-center gap-4">
        {#if user}
          <span class="text-sm text-surface-600">Halo, {user.role}</span>
          <Button href={user.role === 'ADMIN' ? '/admin' : '/dashboard'} variant="primary" size="sm">
            Dashboard
          </Button>
          <form action="/logout" method="POST">
            <Button variant="ghost" size="sm">Keluar</Button>
          </form>
        {:else}
          <Button href="/login" variant="ghost" size="sm">Masuk</Button>
          <Button href="/register" variant="primary" size="sm">Daftar Sekarang</Button>
        {/if}
      </div>

    </div>
  </div>
</nav>

<!-- Mobile Bottom Navigation -->
<nav class="md:hidden fixed bottom-0 w-full z-50 bg-white border-t border-surface-200 pb-[env(safe-area-inset-bottom)]">
  <div class="flex justify-around items-center h-16">
    <a href="/" class="flex flex-col items-center justify-center w-full h-full space-y-1 text-surface-500 hover:text-primary {$page.url.pathname === '/' ? 'text-primary' : ''}">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span class="text-[10px] font-medium">Beranda</span>
    </a>
    
    <a href="/#layanan" class="flex flex-col items-center justify-center w-full h-full space-y-1 text-surface-500 hover:text-primary">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <span class="text-[10px] font-medium">Layanan</span>
    </a>

    <a href={user ? (user.role === 'ADMIN' ? '/admin' : '/dashboard') : '/login'} class="flex flex-col items-center justify-center w-full h-full space-y-1 text-surface-500 hover:text-primary {$page.url.pathname.startsWith('/dashboard') || $page.url.pathname.startsWith('/admin') ? 'text-primary' : ''}">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
      <span class="text-[10px] font-medium">Pesanan</span>
    </a>

    <a href={user ? '/dashboard/settings' : '/login'} class="flex flex-col items-center justify-center w-full h-full space-y-1 text-surface-500 hover:text-primary {$page.url.pathname === '/dashboard/settings' ? 'text-primary' : ''}">
      <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="text-[10px] font-medium">{user ? 'Profil' : 'Masuk'}</span>
    </a>
  </div>
</nav>
