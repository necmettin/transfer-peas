import { c } from "./constants.js";

export const d = {
	get: async function(obj) {
		var url = `${c.papiurl}${obj}/`;
		var request = new Request(url, {
			method: "GET",
			mode: "cors",
			headers: new Headers({
				"Content-Type": "application/json",
				'pragma': 'no-cache',
				'cache-control': 'no-cache',
			})
		});
		var data = await fetch(request).then(x => x.json());
		return data;
	},
	del: async function(obj, id) {
		var url = `${c.papiurl}${obj}/`;
		var request = new Request(url, {
			method: "DELETE",
			mode: "cors",
			body: JSON.stringify([id]),
			headers: new Headers({
				"Content-Type": "application/json",
				'pragma': 'no-cache',
				'cache-control': 'no-cache',
			})
		});
		var data = await fetch(request).then(x => x.json());
		return data;
	}
};
