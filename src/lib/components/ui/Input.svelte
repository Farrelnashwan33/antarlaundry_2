<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  
  interface Props extends HTMLInputAttributes {
    label: string;
    id: string;
    error?: string;
  }

  let { label, id, error, class: className = '', ...rest }: Props = $props();
</script>

<div class="mb-4">
  <label for={id} class="block text-sm font-medium text-surface-700 mb-1">
    {label}
  </label>
  <input
    {id}
    name={id}
    class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors
      {error ? 'border-red-500 focus:ring-red-200' : 'border-surface-300 focus:ring-primary-200 focus:border-primary-500'} 
      {className}"
    {...rest}
  />
  {#if error}
    <p class="mt-1 text-sm text-red-500">{error}</p>
  {/if}
</div>
