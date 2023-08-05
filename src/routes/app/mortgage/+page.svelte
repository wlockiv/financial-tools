<script lang="ts">
	import { page } from '$app/stores';
	import MetricCard from '$lib/components/MetricCard.svelte';
	import Table, { type TableKeys } from '$lib/components/Table.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import DateInput from '$lib/components/form/DateInput.svelte';
	import LabeledInput from '$lib/components/form/LabeledInput.svelte';
	import { response, type MortgageFormResponseIn } from '$lib/components/schema/mortgage-form.js';
	import { nFormatter, toCurrency } from '$lib/components/util/currency.js';
	import {
		faCalendar,
		faClockFour,
		faDollarSign,
		faMultiply,
		faPercent,
		faPlus
	} from '@fortawesome/free-solid-svg-icons';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, errors, allErrors } = superForm(data.form);

	let payments = $page.form?.payments ? response.parse($page.form?.payments) : [];

	let totalInterest =
		$page.form?.payments?.reduce(
			(prev: number, cur: MortgageFormResponseIn[number]) => prev + cur.interestAmt,
			0
		) ?? 0;
	let totalPaid = totalInterest + $form.principle;

	const tableHead = ['Payment #', 'Month', 'Principle', 'Interest', 'Payment', 'Remaining'];
	const tableKeys: TableKeys<typeof payments> = [
		'paymentNo',
		'date',
		'principleAmt',
		'interestAmt',
		'paymentAmt',
		'remainingAmt'
	];
</script>

<div class="grid grid-cols-[auto_1fr] gap-4 p-4">
	<!-- -->
	<div class="w-96 space-y-4">
		<div class="card w-full space-y-2 divide-y divide-surface-600">
			<div class="card-header grid grid-cols-[1fr_auto]">
				<h2 class="text-3xl">My Loans</h2>
				<Tooltip>
					<button class="btn btn-icon-sm variant-filled-primary">
						<Fa icon={faPlus} />
					</button>
					<div slot="tooltip" class="card variant-filled mt-2.5 rounded-lg p-3">
						<div class="arrow variant-filled mt-2.5" />
						<p>Add a loan</p>
					</div>
				</Tooltip>
			</div>
			<nav class="list-nav p-4">
				{#if data.mortgages.length == 0}
					<p>No loans yet!</p>
				{:else}
					<ul class="list-nav">
						{#each data.mortgages as m}
							<li>
								<a href="/app/mortgage" class="flex w-full active:variant-ghost-primary">
									<span class="grow overflow-clip">{m.name}</span>
									<span class="badge variant-soft-primary">${nFormatter(m.principle, 3)}</span>
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</nav>
		</div>
		<div class="card">
			<header class="card-header">
				<h2 class="mb-4 text-3xl">Loan Information</h2>
			</header>
			<hr />
			<form class="space-y-4 p-4" method="post" id="addMortgageForm" action="?/addForm">
				<LabeledInput
					name="name"
					label="Name"
					bind:value={$form.name}
					error={$errors.principle}
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
				<button class="btn variant-filled-primary" type="submit" form="addMortgageForm">
					Submit
				</button>
			</footer>
		</div>
	</div>

	<!--  -->
	{#if $allErrors.length}
		<div class="flex w-full items-center">
			<div class="mx-auto w-3/4 text-center text-4xl">
				Invalid loan information. Correct the errors in the form and try again.
			</div>
		</div>
	{:else if payments.length === 0}
		<div class="flex w-full items-center">
			<div class="mx-auto w-1/2 text-center text-4xl">Add a new loan to get started.</div>
		</div>
	{:else}
		<div class="w-full space-y-4">
			<div class="flex gap-2 [&>*]:max-w-xs [&>*]:flex-grow">
				<MetricCard label="Interest Paid" metric={toCurrency(totalInterest)} />
				<MetricCard label="Total Cost" metric={toCurrency(totalPaid)} />
				<MetricCard label="Payoff Date" metric={payments.at(-1)?.date ?? '-'} />
			</div>
			<hr class="mx-4" />
			<Table headerData={tableHead} bodyData={tableMapperValues(payments, tableKeys)} />
		</div>
	{/if}
</div>
