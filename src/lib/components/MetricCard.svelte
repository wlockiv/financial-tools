<script lang="ts" generics="T extends string | number">
	export let label: string;
	export let metric: T;
	// CSS classes for the wrapper of the card
	export let wrapper = '';
</script>

<div class="card p-5 {wrapper}">
	<div class="label">{label}</div>
	<div class="metric-text">{metric}</div>
</div>

<style lang="postcss">
	.label {
		@apply text-center text-lg uppercase;
	}

	.metric-text {
		@apply text-center text-3xl;
	}
</style>
