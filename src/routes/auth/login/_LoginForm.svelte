<script lang="ts" context="module">
	import z from 'zod';

	export const formSchema = z.object({
		email: z.string().email(),
		password: z.string().nonempty('Required')
	});
</script>

<script lang="ts">
	import LabeledInput from '$lib/components/form/LabeledInput.svelte';
	import { getForm } from '../_AuthFormWrapper.svelte';

	const { formId, form, errors, enhance } = getForm<typeof formSchema>();
</script>

<form id={$formId} class="space-y-4" method="post" use:enhance>
	<LabeledInput name="email" label="Email" bind:value={$form.email} error={$errors.email} />
	<LabeledInput
		name="password"
		label="Password"
		bind:value={$form.password}
		error={$errors.password}
		type="password"
		required
	/>
</form>
