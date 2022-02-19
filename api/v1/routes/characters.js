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
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		authorization: `Bearer ${process.env.AUTH}`,
	};
	// !!!

	const { authorization } = req.headers;

	//
	if (!authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	}

	if (BACKEND_USER.authorization === authorization) {
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
		res.json('not authensticated');
	}
});

// POST
router.post('/', async (req, res) => {
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		authorization: `Bearer ${process.env.AUTH}`,
	};
	// !!!

	const { authorization } = req.headers;

	//
	if (!authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	}

	if (BACKEND_USER.authorization === authorization) {
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
		res.json('not authenticatzed');
	}
});

// DELETE
router.delete('/:id', async (req, res) => {
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		authorization: `Bearer ${process.env.AUTH}`,
	};
	// !!!

	const { authorization } = req.headers;

	//
	if (!authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	}

	if (BACKEND_USER.authorization === authorization) {
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
