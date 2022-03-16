<script>
	import CreateButton from "../widgets/btnCreate.svelte";

	export let title;
	export let obj;
</script>

<div class="row">
	<div class="col-6">
		<h3>{title}</h3>
	</div>
	<div class="col-6 text-right">
		<CreateButton {obj} />
	</div>
</div>
