<script lang="ts">
	import LabeledInput from '$lib/components/form/LabeledInput.svelte';
	import { faSpinner } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const {
		form: loginForm,
		formId,
		errors,
		submitting,
		enhance,
		message
	} = superForm(data.form, { multipleSubmits: 'prevent' });
</script>

<div class="card mx-auto mt-8 w-11/12 max-w-sm">
	<div class="card-header p-4 text-3xl">Log In</div>
	<hr />
	<div class="p-4">
		<form id={$formId} class="space-y-4" method="post" use:enhance>
			<LabeledInput
				name="email"
				label="Email"
				bind:value={$loginForm.email}
				error={$errors.email}
			/>
			<LabeledInput
				name="password"
				label="Password"
				bind:value={$loginForm.password}
				error={$errors.password}
				type="password"
				required
			/>
		</form>

		{#if $message}
			<div class="variant-ghost-error mt-4 rounded p-2">
				<p>{$message}</p>
			</div>
		{/if}
	</div>
	<hr />
	<div class="card-footer p-4">
		<button form={$formId} class="btn variant-filled-primary" type="submit">
			Log In
			{#if $submitting}
				<Fa icon={faSpinner} spin class="ml-2" />
			{/if}
		</button>
	</div>
</div>
