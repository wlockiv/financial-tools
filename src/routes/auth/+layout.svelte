<script lang="ts">
	import { page } from '$app/stores';
</script>

<slot />

<div class="mt-2 space-x-2 text-center">
	{#if $page.url.pathname === '/auth/login'}
		<a class="anchor" href="/auth/signup">Sign Up</a>
		<a class="anchor" href="/auth/reset">Reset Password</a>
	{:else if $page.url.pathname === '/auth/signup'}
		<a class="anchor" href="/auth/login">Log In</a>
	{/if}
</div>
