<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { invalidateAll } from '$app/navigation';
  
  let { children } = $props();
  let isMobileMenuOpen = $state(false);

  // Define navigation items based on the image reference
  const navItems = [
    { name: 'Dashboard', path: '/courier', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Global Queue', path: '/courier#queue', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { name: 'Finished', path: '/courier#history', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
    { name: 'Profile', path: '/dashboard', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ];

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
      <input type="text" placeholder="Search tasks..." class="w-full bg-[#1e293b] text-sm text-slate-200 placeholder-slate-400 border border-slate-700 rounded-md py-1.5 pl-9 pr-12 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
      <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">Ctrl</span>
        <span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">K</span>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <a href="/dashboard" class="text-slate-400 hover:text-white transition-colors" title="Settings" aria-label="Settings">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
      </a>
      <a href="/dashboard" class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-xs hover:bg-blue-500/30 transition-colors" title="My Profile" aria-label="Profile">
        CR
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
        <div class="text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-2 px-2">Courier Tasks</div>
        <button onclick={() => invalidateAll()} class="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-surface-200 text-blue-600 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
          Refresh Queue
        </button>
      </div>

      <div class="px-4 py-2">
        <div class="text-[11px] font-semibold text-surface-400 uppercase tracking-wider mb-2 px-2">Pages</div>
        <nav class="flex flex-col gap-0.5">
          {#each navItems as item}
            <a 
              href={item.path} 
              onclick={(e) => {
                if (item.path.includes('#') && $page.url.pathname === '/courier') {
                  const id = item.path.split('#')[1];
                  const el = document.getElementById(id);
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.pushState(null, '', item.path);
                  }
                }
              }}
              class="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors { $page.url.pathname === item.path || $page.url.pathname.startsWith(item.path + '/') || $page.url.hash === item.path.replace('/courier', '') ? 'bg-blue-50 text-blue-700 font-medium' : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900' }"
            >
              <svg class="w-4 h-4 { $page.url.pathname === item.path || $page.url.pathname.startsWith(item.path + '/') || $page.url.hash === item.path.replace('/courier', '') ? 'text-blue-600' : 'text-surface-400' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              onclick={(e) => {
                isMobileMenuOpen = false;
                if (item.path.includes('#') && $page.url.pathname === '/courier') {
                  const id = item.path.split('#')[1];
                  const el = document.getElementById(id);
                  if (el) {
                    e.preventDefault();
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    window.history.pushState(null, '', item.path);
                  }
                }
              }}
              class="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium { $page.url.pathname === item.path ? 'bg-blue-50 text-blue-700' : 'text-surface-600' }"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}></path>
              </svg>
              {item.name}
            </a>
          {/each}
        </nav>
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
