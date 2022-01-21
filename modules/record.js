import h from "./helpers.js";

class Record {
	_where = {};
	_read = {}; //read from database
	_tablename = "";
	_external_fields = {}; // list of external fiels (ie. {server_id:server, user_id:user})
	external = {}; // fetched external references (ie. {server, user})
	data = {}; // modifications
	constructor(_where = {}) {
		this._where = _where;
		this._update_fields();
	}
	async init (where = {}) {
		this._where = {...this._where, ...where};
		if (this._where) {
			await this.fetch();
			this._update_fields();
		}
	}
	async fetch () {
		this._read = await h.db_find(this._tablename, {where: this._where});
	}
	_update_fields () {
		this.data = {...this._where, ...this._read, ...this.data};
	}
	data () { // all combined data
		return {...this.data, ...this._read, ...this.data, ...this._external};
	}
	async fill_external (fieldnames) {
		if (!fieldnames) {
			fieldnames = Object.keys(this._external_fields);
		}
		for (var key of fieldnames) {
			if (this.data[key]) {
				var tablename = this._external_fields[key];
				var row = await h.db_find(tablename, {where: {id: this.data[key]}});
				var newkey = key;
				if (newkey.endsWith("_id")) {
					newkey = newkey.slice(0, -3);
				}
				this.external[newkey] = row;
			}
		}
	}
	with_removed_fields (fields, delete_defaults = true) {
		var tmp = {...this._read, ...this.data, ...this.external};
		for (var field of fields) {
			delete tmp[field];
		}
		if (delete_defaults) {
			delete tmp["updated_at"];
			delete tmp["created_at"];
			delete tmp["is_deleted"];
		}
		return tmp;
	}
	assign (fields) {
		var keys = Object.keys(fields);
		for (var key of keys) {
			this.data[key] = fields[key];
		}
	}
	async save () {
		this._update_fields();
		if (this.data.password) {
			this.data.pwdhash = h.hash_create(this.data.password);
			delete this.data.password;
		}
		this.data = await h.db_save(this._tablename, this._where, this.data);
	}
}

export default Record;
