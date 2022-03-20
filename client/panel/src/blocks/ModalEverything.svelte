<script>
	import { onMount, createEventDispatcher } from "svelte";
	import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "sveltestrap";
	import { c } from "../modules/constants";
	import { h } from "../modules/helpers";

	export let open = false;
	export let obj = "";
	export let data = {};

	const toggle = () => {
		open = !open;
	};

	const dispatcher = createEventDispatcher();
	async function clicked(objtyp, objid) {
		console.log(objtyp, objid);
		open = false;
		dispatcher("selectObj", [objtyp, objid]);
	}

	onMount(async () => {
		console.log("3", 3, data);
	});
</script>

<Modal isOpen={open} {toggle}>
	<ModalHeader {toggle}>Select element</ModalHeader>
	<ModalBody>
		<table class="object-selector">
			{#each h.obj2arr(data) as row}
				<tr on:click={() => clicked(obj, row.id)}>
					<td class="object-icon">{c.icons[obj]}</td>
					<td>{row.title}</td>
				</tr>
			{/each}
		</table>
		<div class="mt-2 small">Click the item you want to open.</div>
	</ModalBody>
	<ModalFooter>
		<Button color="secondary" on:click={toggle}>Cancel</Button>
	</ModalFooter>
</Modal>

<style>
	:global(.object-selector) {
		cursor: pointer;
	}
	:global(.object-selector > tr > td) {
		padding: 3px;
	}
</style>
