<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	class="bg-error-backdrop-token border-error-400-500-token flex h-full items-center justify-center rounded-md border-2 border-dashed p-4"
>
	<div class="border-error-400-500-token">
		<span class="text-6xl">🤦‍♂️</span>
		<h1 class="text-4xl">This is awkward...</h1>
		<h2 class="text-2xl">{$page.error?.message ?? "I actually don't know what happened... 🤦‍♂️"}</h2>
		{#if $page.error?.userHelp}
			<p>{$page.error.userHelp}</p>
		{/if}
	</div>
</div>
