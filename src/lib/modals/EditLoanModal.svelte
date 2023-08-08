<script context="module" lang="ts">
	import Decimal from 'decimal.js';
	import { z } from 'zod';
	import { schema as createLoanSchema } from './CreateLoanModal.svelte';

	const zNumberLike = z
		.custom<Decimal>((data) => Decimal.isDecimal(data))
		.transform((arg) => arg.toNumber())
		.or(z.number());

	export const schema = createLoanSchema.merge(
		z.object({
			id: z.string().uuid().nonempty(),
			principle: zNumberLike,
			interestRate: zNumberLike
		})
	);
</script>

<script lang="ts">
	import DateInput from '$lib/components/form/DateInput.svelte';
	import LabeledInput from '$lib/components/form/LabeledInput.svelte';
	import {
		faCalendar,
		faClockFour,
		faDollarSign,
		faMultiply,
		faPercent
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa/src/fa.svelte';

	import { modalStore } from '@skeletonlabs/skeleton';
	import { superForm, superValidateSync } from 'sveltekit-superforms/client';

	const meta = schema.parse($modalStore[0].meta);

	const validated = superValidateSync(meta, schema);

	const { form, errors, formId, enhance } = superForm<typeof schema>(validated, {
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
	<form
		class="space-y-4 p-4"
		method="post"
		id={$formId}
		action={`/app/loan/${meta.id}?/edit`}
		use:enhance
	>
		<input type="text" name="id" hidden value={$form.id} />
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
