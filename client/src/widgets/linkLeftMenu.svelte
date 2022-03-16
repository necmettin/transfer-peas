<script>
	export let obj, icon, title;
	import { active_module } from "../modules/stores.js";

	let active = "";
	active_module.subscribe((value) => {
		active = value;
	});
</script>

<div class:active={active == obj}>
	<a class="pl-4" href="/panel/{obj}"><i class="uil uil-{icon}" /> {title}</a>
</div>

<style>
	div {
		padding: 10px 0;
		margin: 10px 0;
	}

	a {
		color: var(--lightgray);
	}

	.active {
		background-color: var(--white);
	}

	.active a {
		color: var(--red);
		font-weight: bold;
	}
</style>
