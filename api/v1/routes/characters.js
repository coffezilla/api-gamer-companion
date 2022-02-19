const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET
router.get('/', async (req, res) => {
	try {
		const characters = await Characters.find({}, { _id: 1, name: 1 });
		res.json(characters);
	} catch (err) {
		res.json(err);
	}
});

// GET SPECIFIC
router.get('/:charId', async (req, res) => {
	const { charId } = req.params;
	const characters = await Characters.find({ _id: charId });
	try {
		res.json(characters);
	} catch (err) {
		res.json(err);
	}
});

// PATCH
router.patch('/:charId', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId } = req.params;
		const { name, portrait } = req.body;

		if (!name) {
			res.json('Missing data');
		} else {
			try {
				const slug = stringify(name);
				const characters = await Characters.updateOne(
					{
						_id: charId,
					},
					{
						$set: {
							name: name,
							slug: slug,
							portrait: portrait,
						},
					}
				);
				res.json(characters);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json('not authenticated');
	}
});

// POST
router.post('/', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { name, portrait } = req.body;
		const slug = stringify(name);

		if (!name) {
			res.json('Missing data');
		} else {
			const characters = new Characters({
				name: name,
				slug: slug,
				portrait: portrait,
			});

			try {
				const savedCharacters = await characters.save();
				res.json(savedCharacters);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json('not authenticated');
	}
});

// DELETE
router.delete('/:id', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { id } = req.params;
		try {
			const characters = await Characters.remove({ _id: id });
			res.json(characters);
		} catch (err) {
			res.json(err);
		}
	} else {
		res.json('not authenticated');
	}
});

module.exports = router;
