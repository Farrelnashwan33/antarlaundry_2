<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';
  
  interface Props extends HTMLButtonAttributes {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    loading?: boolean;
    class?: string;
  }

  let { 
    variant = 'primary', 
    size = 'md', 
    href, 
    loading = false, 
    class: className = '', 
    children, 
    ...rest 
  }: Props = $props();

  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none hover-scale';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover shadow-sm',
    secondary: 'bg-surface-200 text-surface-900 hover:bg-surface-300',
    outline: 'border border-surface-300 bg-transparent hover:bg-surface-100 text-surface-700',
    danger: 'bg-red-600 text-white hover:bg-red-700 shadow-sm',
    ghost: 'bg-transparent hover:bg-surface-100 text-surface-700'
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm',
    md: 'h-10 px-6 text-base',
    lg: 'h-12 px-8 text-lg'
  };

  const currentVariant = $derived(variants[variant as keyof typeof variants]);
  const currentSize = $derived(sizes[size as keyof typeof sizes]);
  const classes = $derived(`${baseStyles} ${currentVariant} ${currentSize} ${className}`);
</script>

{#if href}
  <a {href} class={classes} {...rest as any}>
    {#if loading}
      <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
    {/if}
    {@render children?.()}
  </a>
{:else}
  <button class={classes} disabled={loading || rest.disabled} {...rest}>
    {#if loading}
      <span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
    {/if}
    {@render children?.()}
  </button>
{/if}
