<script>
	import { createEventDispatcher } from "svelte";

	import { Button } from "sveltestrap";
	import { d } from "../modules/data.js";

	export let id;
	export let obj;

	const dispatcher = createEventDispatcher();

	async function clicked() {
		var data = await d.del(obj, id);
		dispatcher("click");
	}
</script>

<Button color="danger" size="sm" on:click={clicked}><i class="uil uil-trash" /> <span class="d-none d-md-inline">Delete</span></Button>
