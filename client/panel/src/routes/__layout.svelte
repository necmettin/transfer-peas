<script>
	import LeftMenuLink from "../widgets/linkLeftMenu.svelte";
	import { active, lists } from "../modules/stores";
</script>

<div class="page-flex">
	<div class="page-left py-4">
		<div class="pl-4 pt-4 pb-4">
			<h1>
				{#if $active.projects > 0}
					{$lists.projects[$active["projects"]].title}
				{:else}
					<LeftMenuLink obj="projects" icon="building" title="Select a project" />
				{/if}
			</h1>
		</div>

		<LeftMenuLink obj="projects" icon="building" title="Projects" />
	</div>
	<div class="page-right p-4">
		<slot />
	</div>
</div>

<style>
	h1 {
		font-size: 1.2rem;
		color: var(--lightgray);
	}

	.page-flex {
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-flex-direction: row;
		-ms-flex-direction: row;
		flex-direction: row;
		-webkit-flex-wrap: nowrap;
		-ms-flex-wrap: nowrap;
		flex-wrap: nowrap;
		-webkit-justify-content: flex-start;
		-ms-flex-pack: start;
		justify-content: flex-start;
		-webkit-align-content: stretch;
		-ms-flex-line-pack: stretch;
		align-content: stretch;
		-webkit-align-items: flex-start;
		-ms-flex-align: start;
		align-items: stretch;
		min-height: 100vh;
	}

	.page-left {
		-webkit-flex: 0 1 auto;
		-ms-flex: 0 1 auto;
		flex: 0 1 auto;
		min-width: 250px;
		width: 250px;
		background: black;
	}

	.page-right {
		-webkit-flex: 1 1 auto;
		-ms-flex: 1 1 auto;
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
		/* justify-content: flex-start; */
		gap: 2px;
		padding: 5px;
	}

	:global(.grid-next) {
		grid-column-start: 1;
	}
</style>
