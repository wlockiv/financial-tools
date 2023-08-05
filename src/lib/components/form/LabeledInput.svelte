<script lang="ts">
	export let label: string;
	export let name = '';
	export let value: Optional<string | number>;
	export let type: 'text' | 'number' | 'range' | 'month' | 'password' = 'text';
	export let step = 1;
	export let labelClass: Optional<string> = '';
	export let inputClass: Optional<string> = '';
	export let error: Optional<string[]> = undefined;
	export let required: Optional<boolean> = false;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;

		switch (type) {
			case 'number':
				value = Number(target.value);
				break;
			case 'range':
				value = Number(target.value);
				break;
			default:
				value = target.value;
		}
	}
</script>

<label class="label {labelClass}">
	<span>{label}</span>
	<div
		class="input-group input-group-divider {$$slots.icon ? 'grid-cols-[auto_1fr]' : ''}"
		class:input-error={!!error}
	>
		{#if $$slots.icon}
			<div class="input-group-shim">
				<slot name="icon" />
			</div>
		{/if}
		<input {name} class={inputClass} {type} on:input={handleInput} {value} {step} {required} />
	</div>
	{#if error}
		<div class="variant-ghost-error rounded p-2">
			<span class="text-error-800-100-token text-sm">{error.join('. ')}</span>
		</div>
	{/if}
</label>
