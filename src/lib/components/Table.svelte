<script context="module" lang="ts">
	export type TableKeys<TArr extends any[]> = Array<keyof TArr[number]>;
</script>

<script lang="ts">
	export let headerData: (string | number)[];
	export let bodyData: (string | number)[][];
</script>

<table class="table h-10 table-auto">
	<thead>
		<tr>
			{#each headerData as heading}
				<th class="text-center">{heading}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each bodyData as row}
			<tr class="text-center">
				{#each row as cell}
					<td>{cell}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
