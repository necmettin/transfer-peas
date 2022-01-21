import {PrismaClient} from '@prisma/client';
var bcrypt = require('bcryptjs');

import c from "./constants";

let prisma = new PrismaClient();
prisma.$connect();

export default {
	db: prisma,
	basepath: process.env.basepath,
	basefn: function(fn) {
		return this.basepath + fn;
	},
	brearer_check: async function(req, res) {
		var token = req.headers?.authorization;
		if (token) {
			token = token.split(" ");
			token.push("");
			token = token[1];
		}
		if (token) {
			var user = await prisma.users.findFirst({where: {token}});
			if (!user.id || !user.is_enabled) {
				this.respond_noauth(res);
			}
		}
		console.log(user);
		console.log(token);
	},
	// --------------------------------
	// GENERAL METHODS
	// GENERAL METHODS
	// GENERAL METHODS
	// --------------------------------
	randstr (length = 60) {
		var result = '';
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		for (var i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	},
	// --------------------------------
	// STRING HASHING METHODS
	// STRING HASHING METHODS
	// STRING HASHING METHODS
	// --------------------------------
	hash_create (str2hash) {
		return bcrypt.hashSync(str2hash, 8);
	},
	hash_check (plaintext, hashedtext) {
		return bcrypt.compareSync(plaintext, hashedtext);
	},
	// --------------------------------
	// DATABASE-RELATED METHODS
	// DATABASE-RELATED METHODS
	// DATABASE-RELATED METHODS
	// --------------------------------
	where2where (src) {
		var dst = {};
		var keys = Object.keys(src);
		for (var srckey of keys) {
			var split = srckey.split('__');
			if (split.length === 1) {
				dst[srckey] = src[srckey];
			} else {
				var fieldname = split[0];
				var operator = split[1];
				if (operator === "eq") {
					dst[fieldname] = src[srckey];
				} else if (['not', 'lt', 'lte', 'gt', 'gte', 'contains'].includes(operator)) {
					dst[fieldname] = {};
					dst[fieldname][operator] = src[srckey];
				} else if (operator == 'like') {
					dst[fieldname] = {'contains': src[srckey]};
				} else if (operator == 'starts') {
					dst[fieldname] = {'startsWith': src[srckey]};
				} else if (operator == 'ends') {
					dst[fieldname] = {'endsWith': src[srckey]};
				}
			}
		}
		return dst;
	},
	async db_find (tablename, where) {
		return await prisma[tablename].findFirst(where);
	},
	async db_findMany (tablename, params) {
		return await prisma[tablename].findMany(params);
	},
	async db_save (tablename, where, data) {
		if (data.id) {
			where = {id: data.id};
			delete data.id;
			return await prisma[tablename].update({where, data});
		} else {
			return await prisma[tablename].create({data});
		}
	},
	async db_update (tablename, where, data) {
		return await prisma[tablename].updateMany({where, data});
	},
	// --------------------------------
	// REQUEST-RELATED METHODS
	// REQUEST-RELATED METHODS
	// REQUEST-RELATED METHODS
	// --------------------------------
	request_is_post (func, req, res) {
		if (req.method === "POST") {
			func(req, res);
		}
	},
	request_get_records (req, res) {
		var {records} = this.required(req, res, ["records"]);
		if (req.method !== "POST") {
			this.respond_invalidform(res, "Must send _records_");
		}
		return records;
	},
	// --------------------------------
	// FORM METHODS
	// FORM METHODS
	// FORM METHODS
	// --------------------------------
	required (req, res, fields) {
		var form = this.form(req);
		for (var key of fields) {
			if (!form[key]) {
				this.respond_invalidform(res, `${key} field is required.`);
			}
		}
		return form;
	},
	form (req) {
		var form = {};
		var keys = Object.keys(req.body);
		for (var key of keys) {
			form[key] = req.body[key];
			if (typeof form[key] === "string") {
				form[key] = form[key].trim();
			}
		}
		return form;
	},
	// --------------------------------
	// RESULT PAGES
	// RESULT PAGES
	// RESULT PAGES
	// --------------------------------
	async results_search (req, res, model) {
		var {skip, take, where} = this.form(req);
		where = where || {};
		skip = skip || c.defSkip;
		take = take || c.defTake;
		where["is_deleted"] = 0;
		var records = new model(where);
		await records.fetch({skip, take, where});
		this.respond_allok(res, records.with_removed_fields(['pwdhash', 'token', 'hash']));
	},
	async results_delete (req, res, model) {
		var {where} = this.required(req, res, ["where"]);
		where = where || {};
		where["is_deleted"] = 0;
		var records = new model(where);
		await records.delete();
		this.respond_allok(res, records.with_removed_fields(['pwdhash', 'token', 'hash']));
	},
	async results_create (req, res, model, initial_fields = [], required_fields = [], optional_fields = []) {
		var fields = {};
		// fill in required fields from form
		var tmp_form = this.required(req, res, required_fields);
		for (var field of required_fields) {
			if (tmp_form[field]) {
				fields[field] = tmp_form[field];
			}
		}
		// fill in optional fields from form
		var tmp_form = this.form(req);
		for (var field of optional_fields) {
			if (tmp_form[field]) {
				fields[field] = tmp_form[field];
			}
		}
		// create record
		var tmp_form = this.form(req);
		var where = {is_deleted: 0};
		for (var field of initial_fields) {
			where[field] = tmp_form[field];
		}
		const record = new model();
		await record.init(where);
		if (record.data.id) {
			this.respond_exists(res);
		} else {
			record.assign(fields);
			await record.save();
			this.respond_allok(res, record.with_removed_fields(["pwdhash", "hash"]));
		}
	},
	// --------------------------------
	// RESPONSE-RELATED METHODS
	// RESPONSE-RELATED METHODS
	// RESPONSE-RELATED METHODS
	// --------------------------------
	response_clean_data (data = {}) {
		["pwdhash"].forEach((key) => {
			delete data[key];
		});
		return data;
	},
	respond_by_method (params) {
		var responded = false;
		if (params.req.method === "POST" && params._post) {
			return params._post(params.req, params.res);
			responded = true;
		}
		if (params.req.method === "GET" && params._get) {
			return params._get(params.req, params.res);
			responded = true;
		}
		if (params.req.method === "DELETE" && params._delete) {
			return params._delete(params.req, params.res);
			responded = true;
		}
		if (params.req.method === "PUT" && params._put) {
			return params._put(params.req, params.res);
			responded = true;
		}
		if (params.req.method === "PATCH" && params._patch) {
			return params._patch(params.req, params.res);
			responded = true;
		}
		if (!responded) {
			return params.res.status(405).json({errno: 405, errmsg: "Method not allowed"});
		}
	},
	respond_allok (res, data = {}) {
		res.status(200).json({errno: 0, errmsg: "", data: this.response_clean_data(data)});
	},
	respond_noauth (res, data = {}) {
		res.status(401).json({errno: 401, errmsg: "Not authorized", data: this.response_clean_data(data)});
	},
	respond_exists (res) {
		res.status(409).json({errno: 409, errmsg: "Existing record"});
	},
	respond_invalidform (res, errmsg) {
		res.status(422).json({errno: 422, errmsg});
	}
};
