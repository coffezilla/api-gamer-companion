const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET
router.get('/', async (req, res) => {
	const { game } = req.query;

	const response = {
		status: 0,
		message: '',
	};

	try {
		const characters = await Characters.find(game ? { game: game } : {}, {
			_id: 1,
			name: 1,
			game: 1,
			portrait: 1,
		}).sort({ name: 1 });
		res.json({
			...response,
			status: 1,
			message: 'Done',
			characters: characters,
		});
	} catch (err) {
		res.json({
			...response,
			message: 'Error',
		});
	}
});

// GET SPECIFIC
router.get('/:charId', async (req, res) => {
	const { charId } = req.params;
	const characters = await Characters.find({ _id: charId });

	const response = {
		status: 0,
		message: '',
	};

	try {
		res.json({
			...response,
			status: 1,
			message: 'Done',
			character: characters[0],
		});
	} catch (err) {
		res.json({
			...response,
			message: 'Error',
		});
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
		const { name, portrait, game } = req.body;

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
							game: game,
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
		const { name, portrait, game } = req.body;
		const slug = stringify(name);

		if (!name) {
			res.json('Missing data');
		} else {
			const characters = new Characters({
				name: name,
				game: game,
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
