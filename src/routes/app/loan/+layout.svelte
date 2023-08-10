<script lang="ts">
	import { page } from '$app/stores';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { nFormatter, toCurrency } from '$lib/components/util/currency';
	import { calculateAverageAPR, calculateTotalInterest } from '$lib/components/util/loans.js';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import type { Loan } from '@prisma/client';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';

	export let data;

	$: totalPrinciple = data.loans.reduce((p: number, c: Loan) => p + c.principle.toNumber(), 0);

	$: avgAPR = calculateAverageAPR(data.loans);

	$: totalInterest = data.loans.reduce((p: number, c: Loan) => p + calculateTotalInterest(c), 0);

	function summonCreateForm() {
		modalStore.trigger({ type: 'component', component: 'createLoan', meta: { mode: 'create' } });
	}
</script>

<div class="grid h-full grid-cols-[auto_1fr] gap-4 p-4">
	<div class="w-96 space-y-4">
		<aside class="card w-full space-y-2 divide-y divide-surface-600">
			<header class="card-header grid grid-cols-[1fr_auto]">
				<h2 class="h3">My Loans</h2>
				<Tooltip>
					<button class="btn btn-icon-sm variant-filled-primary" on:click={summonCreateForm}>
						<Fa icon={faPlus} />
					</button>
					<div slot="tooltip" class="card variant-filled mt-2.5 rounded-lg p-3">
						<div class="arrow variant-filled mt-2.5" />
						<p>Add a loan</p>
					</div>
				</Tooltip>
			</header>
			<nav class="list-nav p-4">
				{#if data.loans.length == 0}
					<p>No loans yet!</p>
				{:else}
					<ul class="list-nav">
						{#each data.loans as l}
							{@const href = `/app/loan/${l.id}`}
							<li>
								<a
									{href}
									class="flex w-full {href === $page.url.pathname ? 'variant-ghost-primary' : ''}"
								>
									<span class="grow overflow-clip">{l.name}</span>
									<span class="badge variant-soft-primary">
										${nFormatter(l.principle.toNumber(), 3)}
									</span>
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</nav>
		</aside>
		<aside class="card">
			<header class="card-header p-4">
				<h2 class="h3">Stats</h2>
			</header>
			<hr />
			<div class="p-4">
				<ul class="list space-y-2">
					<li>
						<div class="flex-auto font-semibold">Total Principle</div>
						<span class="badge variant-soft-primary">
							{toCurrency(totalPrinciple)}
						</span>
					</li>
					<li>
						<div class="flex-auto font-semibold">Total Interest</div>
						<span class="badge variant-soft-primary">{toCurrency(totalInterest)}</span>
					</li>
					<li>
						<div class="flex-auto font-semibold">Avg Interest Rate</div>
						<span class="badge variant-soft-primary">{avgAPR.toFixed(2)}%</span>
					</li>
				</ul>
			</div>
		</aside>
	</div>
	<div class="border-red-500 transition-colors">
		<slot />
	</div>
</div>
