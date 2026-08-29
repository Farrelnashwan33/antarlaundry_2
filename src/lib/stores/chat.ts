import { writable } from 'svelte/store';

export const isChatOpen = writable(false);

export function toggleChat() {
  isChatOpen.update(v => !v);
}

export function openChat() {
  isChatOpen.set(true);
}

export function closeChat() {
  isChatOpen.set(false);
}
