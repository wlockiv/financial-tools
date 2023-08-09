<script lang="ts">
	import MetricCard from '$lib/components/MetricCard.svelte';
	import type { TableDef } from '$lib/components/Table.svelte';
	import Table from '$lib/components/Table.svelte';
	import { toCurrency } from '$lib/components/util/currency';
	import { toMonthString } from '$lib/components/util/date.js';
	import type { LoanPayment } from '$lib/components/util/loans.js';
	import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa/src/fa.svelte';

	export let data;

	$: totalInterest =
		data.payments.reduce((prev: number, cur: LoanPayment) => prev + cur._interestAmt, 0) ?? 0;
	$: totalPaid = totalInterest + data.loan.principle.toNumber();

	const tableDef: TableDef<LoanPayment> = [
		{ headerName: 'Payment #', render: (item) => item.paymentNo },
		{ headerName: 'Date', render: (item) => toMonthString(item._date) },
		{ headerName: 'Principle Amt', render: (item) => toCurrency(item._principleAmt) },
		{ headerName: 'Interest Amt', render: (item) => toCurrency(item._interestAmt) },
		{ headerName: 'Payment Amt', render: (item) => toCurrency(item._paymentAmt) },
		{ headerName: 'Remaining', render: (item) => toCurrency(item._remainingAmt) }
	];

	function summonEditModal() {
		modalStore.trigger({
			type: 'component',
			component: 'editLoan',
			meta: { mode: 'edit', ...data.loan }
		});
	}
</script>

<header class="mb-4 flex">
	<h2 class="h2 grow">{data.loan.name}</h2>
	<div class="flex space-x-2">
		<!-- <form method="post" action="?/edit"> -->
		<button class="btn-icon variant-filled-secondary" on:click={summonEditModal}>
			<Fa icon={faEdit} />
		</button>
		<!-- </form> -->
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
<Table defs={tableDef} data={data.payments} />
