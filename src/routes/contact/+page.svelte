<script lang="ts">
	import { openChat } from '$lib/stores/chat';
</script>

<svelte:head>
	<title>Hubungi CS - Antar Laundry</title>
</svelte:head>

<section class="min-h-[70vh] bg-surface-50 py-24">
	<div class="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
		<h1 class="mb-8 text-4xl font-bold text-surface-900 md:text-5xl">Hubungi Customer Service</h1>
		<div class="rounded-3xl border border-surface-200 bg-white p-8 text-left shadow-sm md:p-12">
			<h2 class="mb-4 text-2xl font-semibold text-primary">Kami Siap Membantu Anda 24/7</h2>
			<p class="mb-8 leading-relaxed text-surface-600">
				Punya kendala dengan pesanan Anda? Atau ingin memberikan saran dan kritik? Tim dukungan
				pelanggan kami selalu tersedia untuk mendengarkan.
			</p>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				<div class="rounded-2xl border border-surface-200 bg-surface-50 p-6 text-center">
					<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-primary-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" /></svg
						>
					</div>
					<h3 class="mb-2 text-lg font-bold">Live Chat</h3>
					<p class="mb-4 text-sm text-surface-600">
						Bicara langsung dengan agen kami via aplikasi.
					</p>
					<button
						onclick={openChat}
						class="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
						>Mulai Chat</button
					>
				</div>
				<div class="rounded-2xl border border-surface-200 bg-surface-50 p-6 text-center">
					<div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-primary-500">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="40"
							height="40"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><rect width="20" height="16" x="2" y="4" rx="2" /><path
								d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
							/></svg
						>
					</div>
					<h3 class="mb-2 text-lg font-bold">Email</h3>
					<p class="mb-4 text-sm text-surface-600">Kirimkan rincian kendala Anda.</p>
					<a
						href="mailto:haloantarlaundry@gmail.com"
						class="inline-block w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-hover"
						>Kirim Email</a
					>
				</div>
			</div>
		</div>
	</div>
</section>
