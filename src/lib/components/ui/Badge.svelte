<script lang="ts">
	interface Props {
		variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { variant = 'neutral', class: className = '', children }: Props = $props();

	const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';

	const variants = {
		primary: 'bg-primary-100 text-primary-800',
		success: 'bg-green-100 text-green-800',
		warning: 'bg-yellow-100 text-yellow-800',
		danger: 'bg-red-100 text-red-800',
		neutral: 'bg-surface-100 text-surface-800'
	};

	const currentVariant = $derived(variants[variant as keyof typeof variants]);
	const classes = $derived(`${baseStyles} ${currentVariant} ${className}`);
</script>

<span class={classes}>
	{@render children?.()}
</span>
