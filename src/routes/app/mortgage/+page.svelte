<script lang="ts">
	import { page } from '$app/stores';
	import MetricCard from '$lib/components/MetricCard.svelte';
	import Table, { type TableKeys } from '$lib/components/Table.svelte';
	import { response, type MortgageFormResponseIn } from '$lib/components/schema/mortgage-form.js';
	import { toCurrency } from '$lib/components/util/currency.js';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	const { form, allErrors } = superForm(data.form);

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

<div class="grid gap-4 p-4">
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
