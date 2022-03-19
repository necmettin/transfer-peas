<script>
	import { onMount } from "svelte";
	import DeleteButton from "../widgets/btnDelete.svelte";
	import SelectButton from "../widgets/btnSelect.svelte";
	import ListingHeader from "./headerListing.svelte";
	import { d } from "../modules/data.js";
	import { h } from "../modules/helpers.js";
	import { active, lists } from "../modules/stores";

	let data = [];
	export let columns = [];
	export let obj;
	export let title;
	export let allowed;

	onMount(async () => {
		var tmp = document.querySelector(":root");
		// @ts-ignore
		tmp.style.setProperty("--listing-col-count", columns.length - 1);
		$active.page = "listing-" + obj;
		await onLoad();
	});

	async function onLoad() {
		data = await d.get(obj);
		$lists[obj] = data;
	}

	async function onDelete() {
		await onLoad();
	}

	async function onSelect(event) {
		await onLoad();
		var details = event.detail;
		$active[obj] = details[0];
	}
</script>

<div>
	<ListingHeader {title} {obj} />
	<div class="grid-parent">
		{#each columns as column}
			<div class="grid-cell grid-title">{column.title}</div>
		{/each}
		<div class="grid-cell grid-title grid-action-cell">Actions</div>
		{#each h.obj2arr(data) as row}
			{#each columns as column, idx}
				{#if column.id.includes(".")}
					<div class="grid-cell" class:grid-next={idx == 0}>{h.str2arr(column.id, row)}</div>
				{:else}
					<div class="grid-cell" class:grid-next={idx == 0}>{row[column.id]}</div>
				{/if}
			{/each}
			<div class="grid-cell grid-action-cell">
				{#if h.has(allowed, "delete")}
					<DeleteButton on:click={onDelete} id={row.id} {obj} />
				{/if}
				{#if h.has(allowed, "select")}
					<SelectButton on:click={onSelect} id={row.id} {obj} />
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	.grid-parent {
		width: 100%;
		grid-template-columns: min-content repeat(var(--listing-col-count, 2), auto) max-content;
	}
</style>
