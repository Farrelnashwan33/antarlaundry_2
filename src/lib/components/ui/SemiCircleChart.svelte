<script lang="ts">
	let {
		percentage = 0,
		target = 0,
		label = ''
	} = $props<{
		percentage?: number;
		target?: number;
		label?: string;
	}>();

	// SVG parameters
	const radius = 40;
	const circumference = Math.PI * radius;
	const strokeDashoffset = $derived(circumference - (percentage / 100) * circumference);
</script>

<div class="flex flex-col items-center justify-center p-4">
	<div class="relative flex h-24 w-40 items-end justify-center">
		<!-- Background track -->
		<svg class="absolute top-0 h-40 w-40" viewBox="0 0 100 100">
			<path
				d="M 10,50 A 40,40 0 0,1 90,50"
				fill="none"
				stroke="#e2e8f0"
				stroke-width="10"
				stroke-linecap="round"
			/>
		</svg>
		<!-- Progress arc -->
		<svg class="absolute top-0 h-40 w-40" viewBox="0 0 100 100">
			<path
				d="M 10,50 A 40,40 0 0,1 90,50"
				fill="none"
				stroke="#7dd3fc"
				stroke-width="10"
				stroke-linecap="round"
				stroke-dasharray={circumference}
				stroke-dashoffset={strokeDashoffset}
				class="origin-center transition-all duration-1000 ease-out"
			/>
		</svg>

		<!-- Text container placed at bottom-center of the semi-circle -->
		<div class="absolute bottom-1 flex w-full flex-col items-center">
			<span class="text-2xl font-bold text-surface-900">{percentage}%</span>
			{#if target > 0}
				<span class="text-xs font-medium text-surface-500">Target: {target}%</span>
			{/if}
		</div>
	</div>
	<div class="mt-4 text-base font-medium text-surface-700">{label}</div>
</div>
