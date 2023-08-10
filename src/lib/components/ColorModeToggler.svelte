<script lang="ts">
	import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
	import {
		getModeOsPrefers,
		modeCurrent,
		setModeCurrent,
		setModeUserPrefers
	} from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';

	function onToggleHandler() {
		$modeCurrent = !$modeCurrent;
		setModeUserPrefers($modeCurrent);
		setModeCurrent($modeCurrent);
	}

	onMount(() => {
		if (!('modeCurrent' in localStorage)) {
			setModeCurrent(getModeOsPrefers());
		}
	});
</script>

<button class="btn-icon variant-filled-secondary" on:click={onToggleHandler}>
	<Fa icon={$modeCurrent ? faMoon : faSun} />
</button>
