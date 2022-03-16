<script>
	import ListingBlock from "../../blocks/blockListing.svelte";
	let columns = [
		{ id: "id", title: "Id" },
		{ id: "domestic_id", title: "Domestic Id" },
		{ id: "email", title: "Email" },
		{ id: "phone", title: "Phone" },
	];
	let title = "Users";
	let obj = "users";
</script>

<div>
	<ListingBlock {columns} {title} {obj} />
</div>
