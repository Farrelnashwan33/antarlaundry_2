<script lang="ts">
  interface Props {
    class?: string;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    hoverable?: boolean;
    children?: import('svelte').Snippet;
  }

  let { class: className = '', padding = 'md', hoverable = false, children }: Props = $props();

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseStyles = 'bg-white rounded-xl border border-surface-200 shadow-sm';
  const hoverStyles = $derived(hoverable ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-1' : '');
  
  const currentPadding = $derived(paddings[padding as keyof typeof paddings]);
  const classes = $derived(`${baseStyles} ${hoverStyles} ${currentPadding} ${className}`);
</script>

<div class={classes}>
  {@render children?.()}
</div>
