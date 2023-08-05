<script>
	import LabeledInput from '$lib/components/form/LabeledInput.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	const { form: signupForm, formId, errors, message } = superForm(data.form);
</script>

<div class="card mx-auto mt-8 w-11/12 max-w-sm">
	<div class="card-header p-4 text-3xl">Create an Account</div>
	<hr />
	<div class="p-4">
		<form id={$formId} class="space-y-4" method="post">
			<LabeledInput
				name="email"
				label="Email Address"
				bind:value={$signupForm.email}
				error={$errors.email}
			/>
			<LabeledInput name="name" label="Name" bind:value={$signupForm.name} error={$errors.name} />
			<LabeledInput
				name="password"
				label="Password"
				bind:value={$signupForm.password}
				type="password"
				error={$errors.password}
			/>
			<LabeledInput
				name="pwConfirm"
				label="Re-Enter Password"
				bind:value={$signupForm.pwConfirm}
				type="password"
				error={$errors.pwConfirm}
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
		<button form={$formId} class="btn variant-filled-primary" type="submit">Sign Up</button>
	</div>
</div>
