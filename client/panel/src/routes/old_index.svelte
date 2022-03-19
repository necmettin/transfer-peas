<script>
	import { onMount } from "svelte";
	import { Button } from "sveltestrap";
	import { c } from "../../src/modules/constants.js";

	onMount(() => {
		// window.location.href = "/panel";
	});
</script>

<div class="flexy">
	<div class="inner p-4">
		<h2 class="mb-2 pb-1 bb">Please login</h2>
		<div class="form-group">
			<label for="email">Email, username, or phone number</label>
			<input type="text" class="form-control" />
		</div>
		<div class="form-group">
			<label for="password">Password</label>
			<input type="text" class="form-control" />
		</div>
		<div>
			<Button color="primary" size="sm">Login</Button>
			&nbsp;
			<a href="/forgot">I forgot my password</a>
		</div>
		<div class="pt-4">
			<a class="small" href={c.panelurl}>T4 Assessment Management System</a>
		</div>
	</div>
</div>

<style>
	.bb {
		border-bottom: 1px solid #aaa;
	}
	.flexy {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 200px;
		min-height: 100vh;
		height: 100vh;
		min-width: 100vw;
		width: 100vw;
	}
	.inner {
		border-radius: 10px;
		width: 300px;
		height: 300px;
		background-color: #eee;
	}
	.small {
		font-size: 0.7rem;
	}
</style>
