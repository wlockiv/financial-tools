<script lang="ts" context="module">
	import type { AnyZodObject } from 'zod';
	import { getContext, setContext } from 'svelte';
	import { superForm, type SuperForm } from 'sveltekit-superforms/client';

	/**
	 * Sets the SuperForm context using the provided validated form object.
	 * @param {SuperValidated<TSchema>} form - The validated form object.
	 */
	function setForm<TSchema extends ZodValidation<AnyZodObject>>(form: SuperValidated<TSchema>) {
		setContext('form', superForm(form));
	}

	/**
	 * Retrieves the SuperForm from the context.
	 * @returns {SuperForm<TSchema>} The SuperForm instance.
	 */
	export function getForm<TSchema extends ZodValidation<AnyZodObject>>(): SuperForm<TSchema> {
		return getContext('form');
	}
</script>

<script lang="ts">
	import type { SuperValidated, ZodValidation } from 'sveltekit-superforms';
	import type { formSchema } from './login/_LoginForm.svelte';

	/**  The title for the card header. */
	export let title: string;
	/** The validated form data object. */
	export let data: SuperValidated<typeof formSchema>;

	setForm(data);
	let { submitting } = getForm();
</script>

<!--
@component
A customizable Svelte component for rendering a card with a header, body, and footer sections.
Used in conjunction with the SuperForms library for form handling.
-->

<div class="card mx-auto mt-8 h-fit w-11/12 max-w-sm">
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
