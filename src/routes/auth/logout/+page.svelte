<script>
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
</script>

<div class="grid h-screen place-items-center">
	<div>
		<div class="flex animate-pulse items-center justify-center">
			<Fa icon={faSpinner} spin size="1.5em" />
			<h1 class="h3 ml-2">Logging Out...</h1>
		</div>
		<p class="mt-4 text-xs">
			If you're not automatically redirected, <a class="anchor" href="/">click here</a>.
		</p>
	</div>
</div>
