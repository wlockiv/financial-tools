<script lang="ts">
	import type { Placement } from '@floating-ui/dom';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let placement: Placement = 'bottom';

	const popupHover: PopupSettings = {
		event: 'hover',
		target: 'popupHover',
		placement
	};
</script>

<div>
	<span use:popup={popupHover}>
		<slot />
	</span>
	<div data-popup="popupHover">
		<slot name="tooltip" />
	</div>
</div>
