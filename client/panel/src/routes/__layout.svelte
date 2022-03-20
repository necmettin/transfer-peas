<script>
	import { onMount, tick } from "svelte";

	import FooterBlock from "../blocks/FooterBlock.svelte";
	import ModalEverything from "../blocks/ModalEverything.svelte";

	import { active, projects } from "../modules/stores";

	import { d } from "../modules/data";

	let selectorModal = false;

	onMount(async () => {
		selectorModal = true;
		$projects = await d.get("projects");
	});

	async function selectedObj(event) {
		var details = event.detail;
		$active[details[0]] = details[1];
		console.log(details, $active);
	}
</script>

<div class="page-flex">
	<div class="page-top" />
	<div class="page-center">
		<ModalEverything open={selectorModal} obj={"projects"} data={$projects} on:selectObj={selectedObj} />
		<slot />
	</div>
	<div class="page-bottom">
		<FooterBlock obj="projects" data={$projects} />
	</div>
</div>

<style>
	:global(body) {
		background-color: #eee;
	}
	.page-flex {
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-content: stretch;
		align-items: stretch;
		height: 100vh;
		width: 100vw;
	}

	.page-top {
		flex: 0 1 auto;
		background: silver;
	}

	.page-bottom {
		flex: 0 1 auto;
		background: #ddd;
	}

	.page-center {
		flex: 1 1 auto;
	}

	:global(.grid-parent) {
		display: grid;
		width: 100%;
		grid-template-rows: 1fr;
		grid-auto-columns: min-content;
		gap: 1px;
	}

	:global(.grid-title) {
		font-weight: bold;
		border-bottom: 1px solid #ccca;
	}

	:global(.grid-action-cell) {
		justify-content: flex-end;
	}

	:global(.grid-cell:not(.grid-action-cell, .grid-title):hover) {
		background-color: rgba(184, 83, 41, 0.2);
	}

	:global(.grid-cell) {
		display: flex;
		align-items: center;
		gap: 2px;
		padding: 5px;
	}

	:global(.grid-next) {
		grid-column-start: 1;
	}

	:global(.object-icon) {
		font-weight: bold;
	}
</style>
