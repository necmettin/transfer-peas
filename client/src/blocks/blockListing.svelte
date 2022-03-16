<script>
	import { onMount } from "svelte";
	import DeleteButton from "../widgets/btnDelete.svelte";
	import ListingHeader from "./headerListing.svelte";
	import { d } from "../modules/data.js";
	import { h } from "../modules/helpers.js";
	import { active_module } from "../modules/stores";

	let data = [];
	export let columns = [];
	export let obj;
	export let title;

	onMount(async () => {
		var tmp = document.querySelector(":root");
		// @ts-ignore
		tmp.style.setProperty("--listing-col-count", columns.length - 1);
		active_module.update((value) => (value = obj));
		await onLoad();
	});

	async function onLoad() {
		data = await d.get(obj);
	}

	async function onDelete() {
		await onLoad();
	}
</script>

<div>
	<ListingHeader {title} {obj} />
	<div class="grid-parent">
		{#each columns as column}
			<div class="grid-cell grid-title">{column.title}</div>
		{/each}
		<div class="grid-cell grid-title grid-action-cell">Actions</div>
		{#each data as row}
			{#each columns as column, idx}
				{#if column.id.includes(".")}
					<div class="grid-cell" class:grid-next={idx == 0}>{h.str2arr(column.id, row)}</div>
				{:else}
					<div class="grid-cell" class:grid-next={idx == 0}>{row[column.id]}</div>
				{/if}
			{/each}
			<div class="grid-cell grid-action-cell"><DeleteButton on:delete={onLoad} id={row.id} {obj} /></div>
		{/each}
	</div>
</div>

<style>
	.grid-parent {
		width: 100%;
		/* grid-template-columns: min-content repeat(auto-fit, minmax(50px, 1fr)) max-content; */
		/* grid-template-columns: repeat(auto-fit, minmax(25px, 1fr)); */
		grid-template-columns: min-content repeat(var(--listing-col-count, 2), auto) max-content;
	}
</style>
