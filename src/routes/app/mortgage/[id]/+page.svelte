<script lang="ts">
	import MetricCard from '$lib/components/MetricCard.svelte';
	import type { TableKeys } from '$lib/components/Table.svelte';
	import Table from '$lib/components/Table.svelte';
	import { toCurrency } from '$lib/components/util/currency';
	import type { LoanPayment } from '$lib/components/util/loans.js';
	import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa/src/fa.svelte';

	export let data;

	$: totalInterest =
		data.payments.reduce((prev: number, cur: LoanPayment) => prev + cur._interestAmt, 0) ?? 0;
	$: totalPaid = totalInterest + data.mortgage.principle.toNumber();

	const tableHead = ['Payment #', 'Month', 'Principle', 'Interest', 'Payment', 'Remaining'];
	const tableKeys: TableKeys<typeof data.payments> = [
		'paymentNo',
		'date',
		'principleAmt',
		'interestAmt',
		'paymentAmt',
		'remainingAmt'
	];
</script>

<header class="mb-4 flex">
	<h2 class="h2 grow">{data.mortgage.name}</h2>
	<div class="flex space-x-2">
		<form method="post" action="?/edit">
			<button class="btn-icon variant-filled-secondary" disabled>
				<Fa icon={faEdit} />
			</button>
		</form>
		<form method="post" action="?/delete">
			<button class="btn-icon variant-filled-warning">
				<Fa icon={faTrash} />
			</button>
		</form>
	</div>
</header>
<div class="mb-4 flex gap-2 [&>*]:max-w-xs [&>*]:flex-grow">
	<MetricCard label="Interest Paid" metric={toCurrency(totalInterest)} />
	<MetricCard label="Total Cost" metric={toCurrency(totalPaid)} />
	<MetricCard label="Payoff Date" metric={data.payments.at(-1)?.date ?? '-'} />
</div>
<Table headerData={tableHead} bodyData={tableMapperValues(data.payments, tableKeys)} />
