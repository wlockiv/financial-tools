<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	import { getContext, setContext } from 'svelte';
	import { superForm, type SuperForm } from 'sveltekit-superforms/client';

	function setForm<TSchema extends ZodValidation<AnyZodObject>>(form: SuperValidated<TSchema>) {
		setContext('form', superForm(form));
	}

	export function getForm<TSchema extends ZodValidation<AnyZodObject>>(): SuperForm<TSchema> {
		return getContext('form');
	}
</script>

<script lang="ts">
	import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
	import type { formSchema } from './login/_LoginForm.svelte';

	export let title: string;
	export let data: SuperValidated<typeof formSchema>;

	setForm(data);
	let { submitting } = getForm();
</script>

<div class="card mx-auto mt-8 w-11/12 max-w-sm">
	<div class="card-header p-4 text-3xl">{title}</div>
	<hr />
	<div class="p-4">
		<slot name="body" />
	</div>
	<hr />
	<div class="card-footer p-4">
		<slot name="footer" submitting={$submitting} />
	</div>
</div>
