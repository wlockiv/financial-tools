<script context="module" lang="ts">
	export type ColumnDef<TData extends any> = {
		headerName: string;
		render: (row: TData) => AnyRenderable;
	};

	export type TableDef<TData extends any> = ColumnDef<TData>[];
</script>

<script lang="ts" generics="TData extends any">
	export let defs: TableDef<TData>;
	export let data: TData[];
</script>

<table class="table h-10 table-auto">
	<thead>
		<tr>
			{#each defs as def}
				<th class="text-center">{def.headerName}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as item}
			<tr class="text-center">
				{#each defs as def}
					<td>{def.render(item)}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
