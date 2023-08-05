<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { faEnvelope, faMailBulk, faUser } from '@fortawesome/free-solid-svg-icons';
	import {
		AppBar,
		AppShell,
		storePopup,
		popup,
		type PopupSettings,
		Modal
	} from '@skeletonlabs/skeleton';
	import Fa from 'svelte-fa/src/fa.svelte';
	import '../app.postcss';
	import type { PageData } from './$types';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	const popupAccount: PopupSettings = {
		event: 'click',
		target: 'popupAccount',
		placement: 'bottom-end'
	};

	export let data: PageData;
</script>

<!-- Modal Singleton -->
<Modal />

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				{#if data.session}
					<a
						class="btn btn-sm variant-ghost-surface"
						href="/account"
						target="_blank"
						rel="noreferrer"
					>
						Account
					</a>

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
