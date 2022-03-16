<script>
	import ListingBlock from "../../blocks/blockListing.svelte";
	let columns = [
		{ id: "id", title: "Id" },
		{ id: "title", title: "Title" },
	];
	let title = "Partners";
	let obj = "partners";
</script>

<div>
	<ListingBlock {columns} {title} {obj} />
</div>
