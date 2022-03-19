<script>
	import ListingBlock from "../blocks/blockListing.svelte";
	let columns = [
		{ id: "id", title: "Id" },
		{ id: "title", title: "Title" },
	];
	let title = "Projects";
	let obj = "projects";
</script>

<div>
	<ListingBlock {columns} {title} {obj} allowed={["select", "delete"]} />
</div>
