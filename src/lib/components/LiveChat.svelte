<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { isChatOpen, toggleChat, closeChat } from '$lib/stores/chat';
	import { onMount, tick } from 'svelte';

	type Message = {
		id: string;
		role: 'bot' | 'user';
		text: string;
		isTyping?: boolean;
	};

	let messages = $state<Message[]>([
		{
			id: '1',
			role: 'bot',
			text: 'Halo! Saya Asisten Pintar Antar Laundry.\nAda yang bisa saya bantu hari ini?'
		}
	]);

	let inputText = $state('');
	let chatContainer = $state<HTMLElement>();
	let isBotTyping = $state(false);

	async function scrollToBottom() {
		await tick();
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}

	function getSmartReply(userText: string): string {
		const text = userText.toLowerCase();

		if (text.includes('harga') || text.includes('biaya') || text.includes('pricelist')) {
			return 'Untuk harga layanan kami mulai dari Rp 10.000/kg untuk Cuci Komplit, dan Rp 15.000/kg untuk Cuci Kering Kilat. Anda juga bisa mendapatkan diskon 20% untuk pelanggan baru!';
		}
		if (
			text.includes('lama') ||
			text.includes('waktu') ||
			text.includes('kapan') ||
			text.includes('berapa hari')
		) {
			return 'Layanan reguler kami selesai dalam 2-3 hari. Kami juga memiliki layanan Express (24 jam) dan Kilat (12 jam) dengan tambahan biaya.';
		}
		if (text.includes('lokasi') || text.includes('alamat') || text.includes('dimana')) {
			return 'Workshop utama kami berada di Jakarta Raya. Namun jangan khawatir, kami melayani antar-jemput (pickup & delivery) gratis untuk area radius 5km!';
		}
		if (
			text.includes('komplain') ||
			text.includes('rusak') ||
			text.includes('hilang') ||
			text.includes('kecewa')
		) {
			return 'Mohon maaf atas ketidaknyamanan yang Anda alami. 🙏\nSilakan hubungi tim Customer Success Manusia kami langsung melalui WhatsApp di 0812-3456-7890 agar masalah ini segera diselesaikan.';
		}
		if (
			text.includes('halo') ||
			text.includes('hai') ||
			text.includes('pagi') ||
			text.includes('siang') ||
			text.includes('malam')
		) {
			return 'Halo kembali! Apakah ada informasi layanan laundry yang ingin Anda tanyakan?';
		}
		if (
			text.includes('terima kasih') ||
			text.includes('makasih') ||
			text.includes('oke') ||
			text.includes('baik')
		) {
			return 'Sama-sama! Senang bisa membantu Anda. Jika ada pertanyaan lain, jangan ragu untuk bertanya ya. 😊';
		}

		return 'Maaf, saya masih terus belajar. Bisa tolong perjelas pertanyaan Anda? Atau Anda butuh bantuan untuk menghubungi agen manusia kami?';
	}

	async function sendMessage() {
		if (!inputText.trim() || isBotTyping) return;

		const userMessage = inputText.trim();
		inputText = '';

		// Add user message
		messages = [...messages, { id: Date.now().toString(), role: 'user', text: userMessage }];
		scrollToBottom();

		isBotTyping = true;

		// Simulate thinking delay (1-2 seconds)
		const delay = Math.floor(Math.random() * 1000) + 1000;

		// Add typing indicator
		const typingId = 'typing-' + Date.now();
		messages = [...messages, { id: typingId, role: 'bot', text: '...', isTyping: true }];
		scrollToBottom();

		setTimeout(() => {
			// Remove typing indicator and add real response
			messages = messages.filter((m) => m.id !== typingId);
			messages = [
				...messages,
				{ id: Date.now().toString(), role: 'bot', text: getSmartReply(userMessage) }
			];
			isBotTyping = false;
			scrollToBottom();
		}, delay);
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}
</script>

<!-- Chat Window -->
{#if $isChatOpen}
	<div
		in:fly={{ y: 50, duration: 300 }}
		out:fade={{ duration: 200 }}
		class="fixed right-6 bottom-6 z-50 flex h-[550px] max-h-[85vh] w-full max-w-[360px] flex-col overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-2xl"
	>
		<!-- Header -->
		<div class="flex items-center justify-between bg-primary px-4 py-4 text-white">
			<div class="flex items-center gap-3">
				<div
					class="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path
							d="M2 14h2"
						/><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg
					>
					<span
						class="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-primary bg-green-400"
					></span>
				</div>
				<div>
					<h3 class="leading-tight font-bold">Asisten Pintar</h3>
					<p class="text-xs text-primary-100">Selalu Aktif (AI)</p>
				</div>
			</div>
			<button
				aria-label="Tutup Chat"
				onclick={closeChat}
				class="rounded-full p-2 text-primary-100 transition hover:bg-white/10 hover:text-white"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Messages Area -->
		<div bind:this={chatContainer} class="flex-1 overflow-y-auto scroll-smooth bg-surface-50 p-4">
			<div class="flex flex-col gap-4">
				{#each messages as msg (msg.id)}
					<div
						class="flex flex-col {msg.role === 'user'
							? 'items-end'
							: 'items-start'} max-w-[85%] {msg.role === 'user' ? 'ml-auto' : 'mr-auto'}"
					>
						<div
							class="{msg.role === 'user'
								? 'bg-primary text-white'
								: 'border border-surface-200 bg-white text-surface-800'} rounded-2xl px-4 py-2.5 {msg.role ===
							'user'
								? 'rounded-br-sm'
								: 'rounded-bl-sm'} text-sm leading-relaxed whitespace-pre-wrap shadow-sm"
						>
							{#if msg.isTyping}
								<div class="flex gap-1 py-1">
									<div
										class="h-2 w-2 animate-bounce rounded-full bg-surface-300"
										style="animation-delay: 0ms"
									></div>
									<div
										class="h-2 w-2 animate-bounce rounded-full bg-surface-300"
										style="animation-delay: 150ms"
									></div>
									<div
										class="h-2 w-2 animate-bounce rounded-full bg-surface-300"
										style="animation-delay: 300ms"
									></div>
								</div>
							{:else}
								{msg.text}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Input Area -->
		<div class="border-t border-surface-200 bg-white p-3">
			<div class="flex items-end gap-2 rounded-xl bg-surface-100 p-1 pr-2">
				<textarea
					bind:value={inputText}
					onkeydown={handleKeydown}
					placeholder="Ketik pesan Anda..."
					class="max-h-32 w-full resize-none border-none bg-transparent px-3 py-2.5 text-sm outline-none focus:ring-0"
					rows="1"></textarea>
				<button
					aria-label="Kirim Pesan"
					onclick={sendMessage}
					disabled={!inputText.trim() || isBotTyping}
					class="mb-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white transition hover:bg-primary-hover disabled:bg-surface-400 disabled:opacity-50"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="ml-0.5 h-4 w-4"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
						/>
					</svg>
				</button>
			</div>
			<div class="mt-2 text-center">
				<span class="text-[10px] font-medium text-surface-400">Powered by AI Simulator</span>
			</div>
		</div>
	</div>
{/if}
