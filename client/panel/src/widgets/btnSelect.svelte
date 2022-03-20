<script>
	import { createEventDispatcher } from "svelte";

	import { Button } from "sveltestrap";

	export let id;
	export let obj;

	const dispatcher = createEventDispatcher();

	async function clicked() {
		dispatcher("click", [id, obj]);
	}
</script>

<Button color="primary" size="sm" on:click={clicked}><i class="uil uil-enter" /> <span class="d-none d-md-inline">Select</span></Button>
