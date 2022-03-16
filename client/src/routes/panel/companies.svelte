<script>
	import ListingBlock from "../../blocks/blockListing.svelte";
	let columns = [
		{ id: "id", title: "Id" },
		{ id: "title", title: "Title" },
	];
	let title = "Companies";
	let obj = "companies";
</script>

<div>
	<ListingBlock {columns} {title} {obj} />
</div>
