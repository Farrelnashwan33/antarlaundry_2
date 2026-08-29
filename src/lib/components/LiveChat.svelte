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
    { id: '1', role: 'bot', text: 'Halo! Saya Asisten Pintar Antar Laundry.\nAda yang bisa saya bantu hari ini?' }
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
    if (text.includes('lama') || text.includes('waktu') || text.includes('kapan') || text.includes('berapa hari')) {
      return 'Layanan reguler kami selesai dalam 2-3 hari. Kami juga memiliki layanan Express (24 jam) dan Kilat (12 jam) dengan tambahan biaya.';
    }
    if (text.includes('lokasi') || text.includes('alamat') || text.includes('dimana')) {
      return 'Workshop utama kami berada di Jakarta Raya. Namun jangan khawatir, kami melayani antar-jemput (pickup & delivery) gratis untuk area radius 5km!';
    }
    if (text.includes('komplain') || text.includes('rusak') || text.includes('hilang') || text.includes('kecewa')) {
      return 'Mohon maaf atas ketidaknyamanan yang Anda alami. 🙏\nSilakan hubungi tim Customer Success Manusia kami langsung melalui WhatsApp di 0812-3456-7890 agar masalah ini segera diselesaikan.';
    }
    if (text.includes('halo') || text.includes('hai') || text.includes('pagi') || text.includes('siang') || text.includes('malam')) {
      return 'Halo kembali! Apakah ada informasi layanan laundry yang ingin Anda tanyakan?';
    }
    if (text.includes('terima kasih') || text.includes('makasih') || text.includes('oke') || text.includes('baik')) {
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
      messages = messages.filter(m => m.id !== typingId);
      messages = [...messages, { id: Date.now().toString(), role: 'bot', text: getSmartReply(userMessage) }];
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
    class="fixed bottom-6 right-6 w-full max-w-[360px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 border border-surface-200"
  >
    <!-- Header -->
    <div class="bg-primary px-4 py-4 flex items-center justify-between text-white">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-primary rounded-full"></span>
        </div>
        <div>
          <h3 class="font-bold leading-tight">Asisten Pintar</h3>
          <p class="text-xs text-primary-100">Selalu Aktif (AI)</p>
        </div>
      </div>
      <button aria-label="Tutup Chat" onclick={closeChat} class="text-primary-100 hover:text-white hover:bg-white/10 p-2 rounded-full transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Messages Area -->
    <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4 bg-surface-50 scroll-smooth">
      <div class="flex flex-col gap-4">
        {#each messages as msg (msg.id)}
          <div class="flex flex-col {msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[85%] {msg.role === 'user' ? 'ml-auto' : 'mr-auto'}">
            
            <div class="{msg.role === 'user' ? 'bg-primary text-white' : 'bg-white border border-surface-200 text-surface-800'} px-4 py-2.5 rounded-2xl {msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'} shadow-sm whitespace-pre-wrap text-sm leading-relaxed">
              {#if msg.isTyping}
                <div class="flex gap-1 py-1">
                  <div class="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                  <div class="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                  <div class="w-2 h-2 bg-surface-300 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
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
    <div class="p-3 bg-white border-t border-surface-200">
      <div class="flex items-end gap-2 bg-surface-100 rounded-xl p-1 pr-2">
        <textarea 
          bind:value={inputText}
          onkeydown={handleKeydown}
          placeholder="Ketik pesan Anda..." 
          class="w-full bg-transparent border-none focus:ring-0 resize-none max-h-32 text-sm px-3 py-2.5 outline-none"
          rows="1"
        ></textarea>
        <button 
          aria-label="Kirim Pesan"
          onclick={sendMessage}
          disabled={!inputText.trim() || isBotTyping}
          class="w-9 h-9 flex-shrink-0 bg-primary text-white rounded-lg flex items-center justify-center disabled:opacity-50 disabled:bg-surface-400 hover:bg-primary-hover transition mb-0.5"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
      <div class="text-center mt-2">
        <span class="text-[10px] text-surface-400 font-medium">Powered by AI Simulator</span>
      </div>
    </div>
  </div>
{/if}
