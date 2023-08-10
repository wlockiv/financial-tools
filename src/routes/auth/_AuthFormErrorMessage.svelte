<script lang="ts">
	import { getForm } from './_AuthFormWrapper.svelte';

	const { message } = getForm();
</script>

{#if $message}
	<div class="variant-ghost-error mt-4 rounded p-2">
		<p>{$message}</p>
	</div>
{/if}
