<script context="module">
	import { subtractTzOffset } from '$lib/components/util/date';
	import { z } from 'zod';

	export const schema = z.object({
		name: z.string().nonempty(),
		principle: z.number().min(1).default(300_000),
		interestRate: z.number().min(0.01).default(5.25),
		term: z.number().min(1).default(30),
		startDate: z.date().default(new Date()).transform(subtractTzOffset),
		additionalFlat: z.number().default(0),
		additionalMultiple: z.number().default(0)
	});
</script>

<script lang="ts">
	import { page } from '$app/stores';
	import DateInput from '$lib/components/form/DateInput.svelte';
	import LabeledInput from '$lib/components/form/LabeledInput.svelte';
	import {
		faDollarSign,
		faPercent,
		faClockFour,
		faCalendar,
		faMultiply
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import { modalStore } from '@skeletonlabs/skeleton';

	const { form, errors, formId, enhance } = superForm<typeof schema>($page.data.form, {
		onResult: () => {
			modalStore.close();
		}
	});
</script>

<div class="card w-11/12 max-w-md">
	<header class="card-header">
		<h2 class="mb-4 text-3xl">Loan Information</h2>
	</header>
	<hr />
	<form class="space-y-4 p-4" method="post" id={$formId} action="/app/mortgage?/create" use:enhance>
		<LabeledInput
			name="name"
			label="Name"
			bind:value={$form.name}
			error={$errors.name}
			type="text"
			required
		/>
		<LabeledInput
			name="principle"
			label="Principle"
			bind:value={$form.principle}
			error={$errors.principle}
			type="number"
			step={0.01}
		>
			<Fa slot="icon" icon={faDollarSign} />
		</LabeledInput>
		<LabeledInput
			name="interestRate"
			label="Interest Rate (APR)"
			bind:value={$form.interestRate}
			error={$errors.interestRate}
			type="number"
			step={0.01}
		>
			<Fa slot="icon" icon={faPercent} />
		</LabeledInput>
		<LabeledInput
			name="term"
			label="Term (Years)"
			bind:value={$form.term}
			error={$errors.term}
			type="number"
		>
			<Fa slot="icon" icon={faClockFour} />
		</LabeledInput>
		<DateInput name="startDate" label="Date" type="month" bind:value={$form.startDate}>
			<Fa slot="icon" icon={faCalendar} />
		</DateInput>
		<LabeledInput
			name="additionalFlat"
			label="Additional Payment"
			bind:value={$form.additionalFlat}
			error={$errors.additionalFlat}
			type="number"
		>
			<Fa slot="icon" icon={faDollarSign} />
		</LabeledInput>
		<LabeledInput
			name="additionalMultiple"
			label="Additional Payment (Multiple)"
			bind:value={$form.additionalMultiple}
			error={$errors.additionalMultiple}
			type="number"
			step={0.1}
		>
			<Fa slot="icon" icon={faMultiply} />
		</LabeledInput>
	</form>
	<hr />
	<footer class="card-footer p-4">
		<button class="btn variant-filled-primary" type="submit" form={$formId}> Submit </button>
	</footer>
</div>
