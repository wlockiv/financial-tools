<script lang="ts">
	import '../app.postcss';

	import { modalComponentRegistry } from '$lib/modals/registry';
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { faBank, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
	import {
		AppBar,
		AppShell,
		Modal,
		modalStore,
		popup,
		storePopup,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa';
	import type { PageData } from './$types';

	storePopup.set({
		computePosition,
		autoUpdate,
		offset,
		shift,
		flip,
		arrow
	});

	const popupAccount: PopupSettings = {
		event: 'click',
		target: 'popupAccount',
		placement: 'bottom-end'
	};

	modalStore.clear();

	export let data: PageData;
</script>

<!-- Modal Singleton -->
<Modal components={modalComponentRegistry} />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Financial Tools</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if data.session}
					<a class="btn btn-sm variant-ghost-surface" href="/"> Home </a>

					<button class="btn-icon variant-ringed w-8" use:popup={popupAccount}>
						<Fa icon={faUser} />
					</button>
					<div class="card space-y-2" data-popup="popupAccount">
						<div class="card-header">
							<div class="flex items-center space-x-2">
								<Fa icon={faEnvelope} />
								<p class="font-bold">Email</p>
							</div>
							<span class="font-light">{data.session.user.email}</span>
						</div>
						<hr />
						<nav class="list-nav px-2">
							<ul>
								<li>
									<a href="/app/loan">
										<span class="flex-auto">My Loans</span>
										<Fa icon={faBank} />
									</a>
								</li>
							</ul>
						</nav>
						<hr />
						<div class="card-footer">
							<form action="/auth/logout" method="post">
								<button class="btn-sm variant-filled-secondary w-full rounded-full" type="submit">
									Log Out
								</button>
							</form>
						</div>
					</div>
				{:else}
					<a class="btn btn-sm variant-ghost-surface" href="/auth/login"> Log In </a>
					<a class="btn btn-sm variant-ghost-surface" href="/auth/signup"> Sign Up </a>
				{/if}
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
