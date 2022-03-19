<script>
	import { createEventDispatcher } from "svelte";

	import { Button } from "sveltestrap";

	export let obj;

	const dispatcher = createEventDispatcher();

	async function clicked() {
		dispatcher("create");
	}
</script>

<Button href="./{obj}/create" color="primary" size="sm" class="ml-auto" on:click={clicked}><i class="uil uil-plus" /> <span class="d-none d-md-inline">Create new</span></Button>
