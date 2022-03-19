<script>
	export let obj, icon, title;
	import { active } from "../modules/stores.js";
</script>

<div class:active={active.page == "listing-" + obj}>
	<a class="pl-4" href="/{obj}"><i class="uil uil-{icon}" /> {title}</a>
</div>

<style>
	div {
		padding: 10px 0;
		margin: 10px 0;
	}

	a {
		color: var(--bs-primary);
		margin: 10px;
	}

	.active {
		background-color: var(--bs-yellow);
		background-color: white;
	}

	.active a {
		color: var(--red);
		font-weight: bold;
	}
</style>
