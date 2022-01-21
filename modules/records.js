import h from "./helpers.js";

class Records {
	_where = {};
	_tablename = "";
	rows = []; // modifications
	constructor(_where = {}) {
		this._where = _where;
	}
	async init (where = {}) {
		this._where = {...this._where, ...where};
		if (this._where) {
			await this.fetch();
		}
	}
	async fetch (params) {
		var where = h.where2where(params.where);
		this.rows = await h.db_findMany(this._tablename, {...params, where});
	}
	async delete () {
		var where = h.where2where(this._where);
		await h.db_update(this._tablename, where, {is_deleted: 1});
	}
	with_removed_fields (fields, delete_defaults = true) {
		var dst = [];
		var rows = [...this.rows];
		for (var row of rows) {
			var newrow = {...row};
			for (var field of fields) {
				delete newrow[field];
			}
			if (delete_defaults) {
				delete newrow["updated_at"];
				delete newrow["created_at"];
				delete newrow["is_deleted"];
			}
			dst.push(newrow);
		}
		return dst;
	}
}

export default Records;
