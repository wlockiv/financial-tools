<script>
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { nFormatter } from '$lib/components/util/currency';
	import { faPlus } from '@fortawesome/free-solid-svg-icons';
	import { modalStore } from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa/src/fa.svelte';

	export let data;

	function summonCreateForm() {
		modalStore.trigger({ type: 'component', component: 'createLoan' });
	}
</script>

<div class="grid grid-cols-[auto_1fr] gap-4 p-4">
	<div class="w-96 space-y-4">
		<div class="card w-full space-y-2 divide-y divide-surface-600">
			<div class="card-header grid grid-cols-[1fr_auto]">
				<h2 class="text-3xl">My Loans</h2>
				<Tooltip>
					<button class="btn btn-icon-sm variant-filled-primary" on:click={summonCreateForm}>
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
								<a href="/app/mortgage/{m.id}" class="flex w-full active:variant-ghost-primary">
									<span class="grow overflow-clip">{m.name}</span>
									<span class="badge variant-soft-primary">${nFormatter(m.principle, 3)}</span>
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</nav>
		</div>
	</div>
	<div>
		<slot />
	</div>
</div>
