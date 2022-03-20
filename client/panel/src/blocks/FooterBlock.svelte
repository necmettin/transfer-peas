<script>
	import { onMount } from "svelte";
	import { active } from "../modules/stores";

	export let obj = "";
	export let data = {};

	onMount(async () => {});
</script>

<div class="p-2 small">{$active[obj] > 0 ? data[$active[obj]].title : ""}</div>
