<script lang="ts">
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { getForm } from './_AuthFormWrapper.svelte';

	const { formId, submitting } = getForm();
</script>

<button form={$formId} class="btn variant-filled-primary" type="submit" disabled={$submitting}>
	<slot>Submit</slot>
	{#if $submitting}
		<Fa icon={faSpinner} spin class="ml-2" />
	{/if}
</button>
