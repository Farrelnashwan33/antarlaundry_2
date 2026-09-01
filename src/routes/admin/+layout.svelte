<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  
  let { children } = $props();
  let isMobileMenuOpen = $state(false);

  const superAdminOnlyPaths = ['/admin/users', '/admin/promos', '/admin/analytics', '/admin/applications'];

  // Define navigation items based on the image reference
  const allNavItems = [
    { name: 'Home', path: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Orders', path: '/admin/orders', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Go Laundry', path: '/admin/golaundry', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
    { name: 'Customers', path: '/admin/customers', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Users', path: '/admin/users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { name: 'Services', path: '/admin/services', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Transactions', path: '/admin/transactions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Promos & Ads', path: '/admin/promos', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
    { name: 'Analytics', path: '/admin/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Pelamar', path: '/admin/applications', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];

  let navItems = $derived(
    $page.data.user?.role === 'SUPER_ADMIN' 
      ? allNavItems 
      : allNavItems.filter(item => !superAdminOnlyPaths.includes(item.path))
  );

  // Logic to hide the main app layout's navbar and footer (which are outside this layout)
  onMount(() => {
    document.body.classList.add('admin-mode');
    return () => {
      document.body.classList.remove('admin-mode');
    };
  });
</script>

<style>
  /* Global CSS override for the main app layout to hide standard navbar and footer */
  :global(body.admin-mode > div > nav) { display: none !important; }
  :global(body.admin-mode > div > footer) { display: none !important; }
  :global(body.admin-mode > div > main) { padding: 0 !important; max-width: 100% !important; }
</style>

<div class="flex flex-col h-screen w-full overflow-hidden bg-[#f4f7f6] font-sans text-surface-900">
  
  <!-- Top Navigation Bar (Dark) -->
  <header class="h-14 bg-[#0f172a] text-white flex items-center justify-between px-6 shrink-0 z-30">
    <div class="flex items-center gap-2">
      <div class="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-sm">
        A
      </div>
      <span class="font-semibold text-lg tracking-tight text-white">Atar <span class="text-blue-400">Laundry</span></span>
    </div>

    <!-- Center Search -->
    <div class="hidden md:flex flex-1 max-w-md mx-4 relative">
      <svg class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      <input type="text" placeholder="Search..." class="w-full bg-[#1e293b] text-sm text-slate-200 placeholder-slate-400 border border-slate-700 rounded-md py-1.5 pl-9 pr-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Ctrl</span>
        <span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">K</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <a href="/admin/users" class="text-slate-400 hover:text-white transition-colors" title="Settings" aria-label="Settings">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      </a>
      <a href="/admin" class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs hover:bg-blue-500/30 transition-colors" title="My Profile" aria-label="Profile">
        AD
      </a>
      <button onclick={() => isMobileMenuOpen = !isMobileMenuOpen} class="md:hidden p-1 text-slate-400" aria-label="Toggle menu">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
      </button>
    </div>
  </header>

  <div class="flex flex-1 overflow-hidden relative">
    
    <!-- Sidebar (White) -->
    <aside class="hidden md:flex flex-col w-56 bg-white border-r border-surface-200 shadow-sm flex-shrink-0 z-20 overflow-y-auto">
      <div class="p-4">
        <div class="text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-2 px-2">Orders</div>
        <a href="/admin/orders/new" class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-surface-200 text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
          New Order
        </a>
      </div>

      <div class="px-4 py-2">
        <div class="text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-2 px-2">Pages</div>
        <nav class="flex flex-col gap-0.5">
          {#each navItems as item}
            <a 
              href={item.path} 
              class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors { ($page.url.pathname === item.path || (item.path !== '/admin' && $page.url.pathname.startsWith(item.path + '/'))) ? 'bg-blue-50 text-blue-700 font-medium' : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900' }"
            >
              <svg class="w-4 h-4 { ($page.url.pathname === item.path || (item.path !== '/admin' && $page.url.pathname.startsWith(item.path + '/'))) ? 'text-blue-600' : 'text-surface-400' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
              </svg>
              {item.name}
            </a>
          {/each}
        </nav>
      </div>
      
      <div class="mt-auto p-4 border-t border-surface-100">
        <form action="/logout" method="POST">
          <button type="submit" class="flex w-full items-center gap-3 px-3 py-2 text-sm text-surface-600 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Logout
          </button>
        </form>
      </div>
    </aside>

    <!-- Mobile Menu -->
    {#if isMobileMenuOpen}
      <div class="md:hidden absolute inset-0 bg-white z-40 flex flex-col pt-4">
        <nav class="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
          {#each navItems as item}
            <a 
              href={item.path} 
              onclick={() => isMobileMenuOpen = false}
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium { ($page.url.pathname === item.path || (item.path !== '/admin' && $page.url.pathname.startsWith(item.path + '/'))) ? 'bg-blue-50 text-blue-700' : 'text-surface-600' }"
            >
              <svg class="w-5 h-5 { ($page.url.pathname === item.path || (item.path !== '/admin' && $page.url.pathname.startsWith(item.path + '/'))) ? 'text-blue-600' : 'text-surface-400' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
              </svg>
              {item.name}
            </a>
          {/each}
        </nav>
        <div class="p-4 border-t border-surface-100">
          <form action="/logout" method="POST">
            <button type="submit" class="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              Logout
            </button>
          </form>
        </div>
      </div>
    {/if}

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto bg-[#f4f7f6] min-w-0">
      <div class="p-6 md:p-8 max-w-[1600px] mx-auto w-full overflow-x-hidden">
        {@render children()}
      </div>
    </main>
    
  </div>
</div>
