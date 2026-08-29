<script lang="ts">
  import { enhance } from '$app/forms';
  import Button from '$lib/components/ui/Button.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  
  let { form } = $props();
  let loading = $state(false);
</script>

<svelte:head>
  <title>Daftar - Antar Laundry</title>
</svelte:head>

<div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
  <Card padding="lg" class="w-full max-w-md">
    <div class="text-center mb-8">
      <h1 class="text-2xl font-bold text-surface-900 mb-2">Daftar Akun Baru</h1>
      <p class="text-surface-600">Bergabunglah dengan Antar Laundry sekarang.</p>
    </div>

    {#if form?.error}
      <div class="mb-6 p-4 rounded-lg bg-red-50 text-red-600 border border-red-200 text-sm">
        {form.error}
      </div>
    {/if}

    <form 
      method="POST" 
      use:enhance={() => {
        loading = true;
        return async ({ update }) => {
          await update();
          loading = false;
        };
      }}
    >
      <Input label="Nama Lengkap" id="name" type="text" placeholder="Masukkan nama Anda" required />
      <Input label="Email" id="email" type="email" placeholder="contoh@email.com" required />
      <Input label="Nomor WhatsApp" id="phone" type="tel" placeholder="081234567890" required />
      <Input label="Kata Sandi" id="password" type="password" placeholder="Minimal 6 karakter" required minlength={6} />
      
      <div class="mb-6">
        <label for="role" class="block text-sm font-medium text-surface-700 mb-1">Mendaftar Sebagai</label>
        <select id="role" name="role" class="w-full px-4 py-2 border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 bg-white">
          <option value="CUSTOMER">Pelanggan</option>
          <option value="COURIER">Kurir (Mitra)</option>
        </select>
      </div>

      <Button type="submit" class="w-full" {loading}>Daftar Sekarang</Button>
    </form>

    <div class="mt-6 text-center text-sm text-surface-600">
      Sudah punya akun? <a href="/login" class="text-primary hover:underline font-medium">Masuk di sini</a>
    </div>
  </Card>
</div>
