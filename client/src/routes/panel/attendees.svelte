<script>
	import ListingBlock from "../../blocks/blockListing.svelte";
	let columns = [
		{ id: "id", title: "Id" },
		{ id: "company.title", title: "Company" },
		{ id: "domestic_id", title: "Domestic Id" },
		{ id: "email", title: "Email" },
		{ id: "phone", title: "Phone" },
	];
	let title = "Attendees";
	let obj = "attendees";
</script>

<div>
	<ListingBlock {columns} {title} {obj} />
</div>
