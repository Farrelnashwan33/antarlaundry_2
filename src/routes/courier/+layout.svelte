<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	let { children } = $props();
	let isMobileMenuOpen = $state(false);

	// Define navigation items based on the image reference
	const navItems = [
		{
			name: 'Dashboard',
			path: '/courier',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			name: 'Store',
			path: '/courier/store',
			icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
		},
		{
			name: 'Finished',
			path: '/courier/history',
			icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
		},
		{
			name: 'Profile',
			path: '/dashboard',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
		}
	];

	// Logic to hide the main app layout's navbar and footer (which are outside this layout)
	onMount(() => {
		document.body.classList.add('admin-mode');
		return () => {
			document.body.classList.remove('admin-mode');
		};
	});
</script>

<div class="flex h-screen w-full flex-col overflow-hidden bg-[#f4f7f6] font-sans text-surface-900">
	<!-- Top Navigation Bar (Dark) - Hidden on Mobile -->
	<header
		class="z-30 hidden h-14 shrink-0 items-center justify-between bg-[#0f172a] px-6 text-white md:flex"
	>
		<div class="flex items-center gap-2">
			<div
				class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white shadow-sm"
			>
				A
			</div>
			<span class="text-lg font-semibold tracking-tight text-white"
				>Atar <span class="text-blue-400">Laundry</span></span
			>
		</div>

		<!-- Center Search -->
		<div class="relative mx-4 hidden max-w-md flex-1 md:flex">
			<svg
				class="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				></path></svg
			>
			<input
				type="text"
				placeholder="Search tasks..."
				class="w-full rounded-md border border-slate-700 bg-[#1e293b] py-1.5 pr-12 pl-9 text-sm text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
			/>
			<div class="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1">
				<span
					class="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400"
					>Ctrl</span
				>
				<span
					class="rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400"
					>K</span
				>
			</div>
		</div>

		<div class="flex items-center gap-4">
			<a
				href="/courier"
				class="text-slate-400 transition-colors hover:text-white"
				title="Settings"
				aria-label="Settings"
			>
				<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					></path><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					></path></svg
				>
			</a>
			<a
				href="/courier"
				class="flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/20 text-xs font-bold text-blue-400 transition-colors hover:bg-blue-500/30"
				title="My Profile"
				aria-label="Profile"
			>
				CR
			</a>
		</div>
	</header>

	<div class="relative flex flex-1 overflow-hidden">
		<!-- Sidebar (White) -->
		<aside
			class="z-20 hidden w-56 flex-shrink-0 flex-col overflow-y-auto border-r border-surface-200 bg-white shadow-sm md:flex"
		>
			<div class="p-4">
				<div class="mb-2 px-2 text-[11px] font-semibold tracking-wider text-surface-400 uppercase">
					Courier Tasks
				</div>
				<button
					onclick={() => invalidateAll()}
					class="flex w-full items-center justify-center gap-2 rounded-md border border-surface-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50"
				>
					<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						></path></svg
					>
					Refresh Queue
				</button>
			</div>

			<div class="px-4 py-2">
				<div class="mb-2 px-2 text-[11px] font-semibold tracking-wider text-surface-400 uppercase">
					Pages
				</div>
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
							class="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors {$page
								.url.pathname === item.path ||
							$page.url.pathname.startsWith(item.path + '/') ||
							$page.url.hash === item.path.replace('/courier', '')
								? 'bg-blue-50 font-medium text-blue-700'
								: 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'}"
						>
							<svg
								class="h-4 w-4 {$page.url.pathname === item.path ||
								$page.url.pathname.startsWith(item.path + '/') ||
								$page.url.hash === item.path.replace('/courier', '')
									? 'text-blue-600'
									: 'text-surface-400'}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={item.icon}
								></path>
							</svg>
							{item.name}
						</a>
					{/each}
				</nav>
			</div>

			<div class="mt-auto border-t border-surface-100 p-4">
				<form action="/logout" method="POST">
					<button
						type="submit"
						class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-surface-600 transition-colors hover:bg-red-50 hover:text-red-600"
					>
						<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							></path></svg
						>
						Logout
					</button>
				</form>
			</div>
		</aside>

		<!-- Main Content -->
		<main class="min-w-0 flex-1 overflow-y-auto bg-[#f4f7f6] pb-20 md:pb-0">
			<div class="mx-auto w-full max-w-[1600px] overflow-x-hidden p-6 md:p-8">
				{@render children()}
			</div>
		</main>

		<!-- Mobile Bottom Navigation -->
		<nav class="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-surface-200 bg-white px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
			{#each navItems as item}
				<a
					href={item.path}
					class="flex flex-1 flex-col items-center justify-center gap-1.5 transition-colors
            {$page.url.pathname === item.path
						? 'text-blue-600'
						: 'text-surface-500 hover:text-surface-700'}"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={$page.url.pathname === item.path ? '2.5' : '2'}
							d={item.icon}
						></path>
					</svg>
					<span class="text-[11px] leading-none font-medium">{item.name}</span>
				</a>
			{/each}
		</nav>
	</div>
</div>

<style>
	/* Global CSS override for the main app layout to hide standard navbar and footer */
	:global(body.admin-mode > div > nav) {
		display: none !important;
	}
	:global(body.admin-mode > div > footer) {
		display: none !important;
	}
	:global(body.admin-mode > div > main) {
		padding: 0 !important;
		max-width: 100% !important;
	}
</style>
