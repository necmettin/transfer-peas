import h from "../../../modules/helpers.js";
import ConsumableMedium from "../../../models/ConsumableMedium.js";
import ConsumableMedia from "../../../models/ConsumableMedia.js";

// register new Company
async function _post (req, res) {
	h.results_create(req, res, ConsumableMedium, ["title", "typ"], ["title", "typ"], ["status", "last_consumed"]);
}

// get a list of Companies
async function _get (req, res) {
	h.results_search(req, res, ConsumableMedia);
}

async function _delete (req, res) {
	h.results_delete(req, res, ConsumableMedia);
}

export default async (req, res) => {
	return h.respond_by_method({req, res, _post, _get, _delete});
};
