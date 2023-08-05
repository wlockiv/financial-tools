<script context="module" lang="ts">
	const formatMap = {
		date: 'yyyy-MM-dd',
		month: 'yyyy-MM',
		week: 'yyyy-Www',
		time: 'hh:mm',
		'datetime-local': 'yyyy-MM-ddThh:mm'
	};
</script>

<script lang="ts">
	import { format, parseISO } from 'date-fns';
	import { toDate } from 'date-fns-tz';
	import LabeledInput from './LabeledInput.svelte';

	export let label: string;
	export let name = '';
	export let value: Date = new Date();
	export let type: keyof typeof formatMap = 'date';

	let stringValue = format(value, formatMap[type]);
	$: {
		let before = value;
		let date = parseISO(stringValue);
		value = toDate(date);
	}
</script>

<LabeledInput {name} {label} bind:value={stringValue} type="month">
	<slot name="icon" slot="icon" />
</LabeledInput>
