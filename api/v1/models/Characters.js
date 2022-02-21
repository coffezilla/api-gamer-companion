const mongoose = require('mongoose');

// schema
const SchemaCharacter = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	portrait: { type: String, required: false },
	status: {
		type: Number,
		default: 1,
	},
	slug: String,
	skins: {
		type: [
			{
				name: {
					type: String,
					required: true,
				},
				slug: { type: String, required: true },
				is_dlc: { type: Boolean, default: true },
			},
		],
		default: [],
	},
	moves: {
		type: [
			{
				name: {
					type: String,
					required: true,
				},
				annotation: {
					type: String,
					default: '',
				},
				slug: { type: String, required: true },
				commands: {
					combination: [Number],
					requirement: String,
				},
			},
		],
		default: [],
	},
	fatalities: {
		type: [
			{
				name: {
					type: String,
					required: true,
				},
				annotation: {
					type: String,
					default: '',
				},
				slug: { type: String, required: true },
				commands: {
					combination: [Number | [Number]],
					requirement: String,
				},
			},
		],
		default: [],
	},
	brutalities: {
		type: [
			{
				name: {
					type: String,
					required: true,
				},
				annotation: {
					type: String,
					default: '',
				},
				slug: { type: String, required: true },
				commands: {
					combination: [Number],
					requirement: String,
				},
			},
		],
		default: [],
	},
	combos: {
		type: [
			{
				name: {
					type: String,
					required: true,
				},
				annotation: {
					type: String,
					default: '',
				},
				slug: { type: String, required: true },
				commands: {
					combination: [Number],
					requirement: String,
				},
			},
		],
		default: [],
	},
});

//
module.exports = mongoose.model('Character', SchemaCharacter);
