<script lang="ts">
	import currency from 'currency.js';

	export let label: string;
	export let value: number = 300_000;
	export let labelClass: Optional<string> = '';
	export let inputClass: Optional<string> = '';

	let formattedInput = currency(value).format();

	function handleBlur(e: Event) {
		const target = e.target as HTMLInputElement;

		if (target.value != '') {
			formattedInput = currency(target.value).format();
			value = currency(target.value).value;
			return;
		}

		value = target.value ? Math.round(parseFloat(target.value) * 100) / 100 : 0;
		formattedInput = currency(0).toString().replaceAll('$', '');
	}

	function handleFocus(e: Event) {
		const target = e.target as HTMLInputElement;

		formattedInput = value.toString();
	}
</script>

<label class="label {labelClass}">
	<span>{label}</span>
	<div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
		{#if $$slots.icon}
			<div class="input-group-shim">
				<slot name="icon" />
			</div>
		{/if}
		<input
			class={inputClass}
			value={formattedInput}
			on:focus={handleFocus}
			on:blur={handleBlur}
			type="text"
		/>
	</div>
</label>
