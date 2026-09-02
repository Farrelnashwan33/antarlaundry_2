<script lang="ts">
	import { page } from '$app/stores';

	let { children, data } = $props();
	let user = $derived(data.user);
	let profile = $derived(data.profile);
	let isMobileMenuOpen = $state(false);

	// Navigation Links
	const navLinks = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
		},
		{
			label: 'Pesanan Saya',
			href: '/dashboard/orders',
			icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
		},
		{
			label: 'Buat Pesanan',
			href: '/dashboard/order/new',
			icon: 'M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			label: 'Keuangan',
			href: '/dashboard/wallet',
			icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
		},
		{
			label: 'Riwayat Transaksi',
			href: '/dashboard/history',
			icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			label: 'Alamat Saya',
			href: '/dashboard/address',
			icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z'
		},
		{
			label: 'Promo & Voucher',
			href: '/dashboard/promo',
			icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
		},
		{
			label: 'Bantuan',
			href: '/dashboard/support',
			icon: 'M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
		},
		{
			label: 'Pengaturan',
			href: '/dashboard/settings',
			icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
		}
	];
</script>

<div
	class="relative flex h-screen w-full flex-col overflow-hidden bg-surface-50 font-sans md:flex-row"
>
	<!-- Mobile Menu & Header have been replaced by Bottom Navigation -->

	<!-- Sidebar (Desktop) -->
	<aside
		class="hidden w-72 shrink-0 flex-col justify-between border-r border-surface-200 bg-white md:flex"
	>
		<div class="flex h-full flex-col">
			<!-- Logo Area -->
			<div class="flex items-center gap-3 border-b border-surface-100 p-6">
				<div
					class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white shadow-md shadow-blue-500/20"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
						></path></svg
					>
				</div>
				<div class="flex flex-col">
					<span class="text-lg leading-tight font-extrabold text-blue-700">AntarLaundry</span>
					<span class="text-[10px] font-medium tracking-wide text-surface-500"
						>Bersih, Cepat, Terpercaya</span
					>
				</div>
			</div>

			<!-- Navigation Links -->
			<nav class="flex-1 space-y-1 overflow-y-auto px-4 py-6">
				{#each navLinks as link}
					<a
						href={link.href}
						class="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-200
              {$page.url.pathname === link.href
							? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
							: 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'}"
					>
						<svg
							class="h-5 w-5 {$page.url.pathname === link.href ? 'text-white' : 'text-surface-400'}"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={link.icon}
							></path>
						</svg>
						{link.label}
					</a>
				{/each}
			</nav>

			<!-- Profile Area -->
			<div class="border-t border-surface-100 p-4">
				<div
					class="flex cursor-pointer items-center justify-between rounded-2xl border border-surface-200 bg-surface-50 p-4 transition-colors hover:bg-surface-100"
				>
					<div class="flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm"
						>
							{profile?.name ? profile.name.substring(0, 2).toUpperCase() : 'US'}
						</div>
						<div class="flex flex-col">
							<span class="text-sm leading-tight font-bold text-surface-900">{profile?.name}</span>
							<span class="max-w-[120px] truncate text-xs text-surface-500">{profile?.email}</span>
						</div>
					</div>
					<svg
						class="h-4 w-4 text-surface-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						></path></svg
					>
				</div>

				<form method="POST" action="/logout" class="mt-2">
					<button
						class="flex w-full items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
							></path></svg
						>
						Keluar
					</button>
				</form>
			</div>
		</div>
	</aside>

	<!-- Main Content Area -->
	<main class="h-full flex-1 overflow-y-auto pb-20 md:pb-0">
		{@render children()}
	</main>

	<!-- Mobile Bottom Navigation -->
	<nav class="fixed inset-x-0 bottom-0 z-50 flex items-center justify-around border-t border-surface-200 bg-white px-2 py-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] md:hidden">
		<!-- Beranda -->
		<a href="/dashboard" class="flex w-16 flex-col items-center justify-center gap-1.5 transition-colors {$page.url.pathname === '/dashboard' ? 'text-blue-600' : 'text-surface-500 hover:text-surface-700'}">
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={$page.url.pathname === '/dashboard' ? '2.5' : '2'} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
			<span class="text-[11px] leading-none font-medium">Beranda</span>
		</a>

		<!-- Pesanan -->
		<a href="/dashboard/orders" class="flex w-16 flex-col items-center justify-center gap-1.5 transition-colors {$page.url.pathname === '/dashboard/orders' ? 'text-blue-600' : 'text-surface-500 hover:text-surface-700'}">
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={$page.url.pathname === '/dashboard/orders' ? '2.5' : '2'} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
			<span class="text-[11px] leading-none font-medium">Pesanan</span>
		</a>

		<!-- Pesan (New Order) -->
		<a href="/dashboard/order/new" class="flex w-16 flex-col items-center justify-center gap-1.5 transition-colors {$page.url.pathname === '/dashboard/order/new' ? 'text-blue-600' : 'text-surface-500 hover:text-surface-700'}">
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={$page.url.pathname === '/dashboard/order/new' ? '2.5' : '2'} d="M12 4v16m8-8H4"></path></svg>
			<span class="text-[11px] leading-none font-medium">Pesan</span>
		</a>

		<!-- Dompet -->
		<a href="/dashboard/wallet" class="flex w-16 flex-col items-center justify-center gap-1.5 transition-colors {$page.url.pathname === '/dashboard/wallet' ? 'text-blue-600' : 'text-surface-500 hover:text-surface-700'}">
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={$page.url.pathname === '/dashboard/wallet' ? '2.5' : '2'} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
			<span class="text-[11px] leading-none font-medium">Dompet</span>
		</a>

		<!-- Akun -->
		<a href="/dashboard/settings" class="flex w-16 flex-col items-center justify-center gap-1.5 transition-colors {$page.url.pathname.includes('/dashboard/settings') ? 'text-blue-600' : 'text-surface-500 hover:text-surface-700'}">
			<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width={$page.url.pathname.includes('/dashboard/settings') ? '2.5' : '2'} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
			<span class="text-[11px] leading-none font-medium">Akun</span>
		</a>
	</nav>
</div>
