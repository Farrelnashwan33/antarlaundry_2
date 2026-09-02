<script lang="ts">
	import { page } from '$app/stores';
	import Button from './ui/Button.svelte';

	const navLinks = [
		{ name: 'Beranda', href: '/' },
		{ name: 'Layanan', href: '/#layanan' },
		{ name: 'Cara Kerja', href: '/#cara-kerja' },
		{ name: 'Kontak', href: '/contact' }
	];

	let user = $derived($page.data.user);

	function getDashboardUrl(role: string) {
		if (role === 'ADMIN' || role === 'SUPER_ADMIN') return '/admin';
		if (role === 'COURIER') return '/courier';
		return '/dashboard';
	}
</script>

<nav class="fixed top-0 z-50 w-full border-b border-surface-200 bg-white/80 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex items-center">
				<a href="/" class="flex flex-shrink-0 items-center gap-2">
					<!-- Logo -->
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xl font-bold text-white"
					>
						A
					</div>
					<span class="text-xl font-bold tracking-tight text-surface-900"
						>Antar<span class="text-primary">Laundry</span></span
					>
				</a>

				<!-- Desktop Nav -->
				<div class="hidden md:ml-10 md:flex md:space-x-8">
					{#each navLinks as link}
						<a
							href={link.href}
							class="inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors hover:text-primary {$page
								.url.pathname === link.href
								? 'border-b-2 border-primary text-primary'
								: 'text-surface-600'}"
						>
							{link.name}
						</a>
					{/each}
				</div>
			</div>

			<div class="hidden items-center gap-4 md:flex">
				{#if user}
					<span class="text-sm text-surface-600">Halo, {user.role}</span>
					<Button href={getDashboardUrl(user.role)} variant="primary" size="sm">Dashboard</Button>
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
<nav
	class="fixed bottom-0 z-50 w-full border-t border-surface-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
>
	<div class="flex h-16 items-center justify-around">
		<a
			href="/"
			class="flex h-full w-full flex-col items-center justify-center space-y-1 text-surface-500 hover:text-primary {$page
				.url.pathname === '/'
				? 'text-primary'
				: ''}"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
				/>
			</svg>
			<span class="text-[10px] font-medium">Beranda</span>
		</a>

		<a
			href="/#layanan"
			class="flex h-full w-full flex-col items-center justify-center space-y-1 text-surface-500 hover:text-primary"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
				/>
			</svg>
			<span class="text-[10px] font-medium">Layanan</span>
		</a>

		<a
			href={user ? getDashboardUrl(user.role) : '/login'}
			class="flex h-full w-full flex-col items-center justify-center space-y-1 text-surface-500 hover:text-primary {$page.url.pathname.startsWith(
				'/dashboard'
			) || $page.url.pathname.startsWith('/admin')
				? 'text-primary'
				: ''}"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
				/>
			</svg>
			<span class="text-[10px] font-medium">Pesanan</span>
		</a>

		<a
			href={user ? '/dashboard/settings' : '/login'}
			class="flex h-full w-full flex-col items-center justify-center space-y-1 text-surface-500 hover:text-primary {$page
				.url.pathname === '/dashboard/settings'
				? 'text-primary'
				: ''}"
		>
			<svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
				/>
			</svg>
			<span class="text-[10px] font-medium">{user ? 'Profil' : 'Masuk'}</span>
		</a>
	</div>
</nav>
