<script lang="ts" context="module">
	import { z } from 'zod';

	export const formSchema = z
		.object({
			email: z.string().email(),
			name: z.string().nonempty(),
			password: z
				.string()
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					'Must contain at least eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
				),
			pwConfirm: z.string()
		})
		.refine((arg) => arg.password === arg.pwConfirm, {
			message: 'Passwords did not match',
			path: ['pwConfirm']
		});
</script>

<script lang="ts">
	import LabeledInput from '$lib/components/form/LabeledInput.svelte';
	import { getForm } from '../_AuthFormWrapper.svelte';

	const { formId, form, errors, enhance } = getForm<typeof formSchema>();
</script>

<form id={$formId} class="space-y-4" method="post" use:enhance>
	<LabeledInput name="email" label="Email Address" bind:value={$form.email} error={$errors.email} />
	<LabeledInput name="name" label="Name" bind:value={$form.name} error={$errors.name} />
	<LabeledInput
		name="password"
		label="Password"
		bind:value={$form.password}
		type="password"
		error={$errors.password}
	/>
	<LabeledInput
		name="pwConfirm"
		label="Re-Enter Password"
		bind:value={$form.pwConfirm}
		type="password"
		error={$errors.pwConfirm}
	/>
</form>
