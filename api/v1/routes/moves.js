const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET SKINS
router.get('/:charId/moves', async (req, res) => {
	const { charId } = req.params;
	try {
		const moves = await Characters.find({ _id: charId }, { moves: 1 }).sort({
			name: 1,
		});
		res.json(moves);
	} catch (err) {
		res.json(err);
	}
});

// GET SKINS SPECIFY
router.get('/:charId/moves/:slug', async (req, res) => {
	const { charId, slug } = req.params;
	const response = {
		status: 0,
		message: '',
	};
	try {
		const move = await Characters.find(
			{ _id: charId },
			{
				moves: {
					$elemMatch: { slug: slug },
				},
			}
		).sort({ name: 1 });

		res.json({
			...response,
			status: 1,
			message: 'Done',
			move: move[0].moves[0],
		});
	} catch (err) {
		res.json({
			...response,
			message: 'Error',
		});
	}
});

// POST SKINS
router.post('/:charId/moves', async (req, res) => {
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		authorization: `Bearer ${process.env.AUTH}`,
	};
	// !!!

	const { authorization } = req.headers;
	const response = {
		status: 0,
		message: '',
	};

	//
	if (!authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	}

	if (BACKEND_USER.authorization === authorization) {
		const { charId } = req.params;
		const { name, commands, annotation } = req.body;

		if (!name || !commands) {
			res.json({
				...response,
				message: 'Missing data',
			});
		} else {
			try {
				// slugify
				const slugId = stringify(name);
				const characters = await Characters.updateOne(
					{ _id: charId },
					{
						$push: {
							moves: {
								name: name,
								slug: slugId,
								commands: commands,
								annotation: annotation,
							},
						},
					}
				);

				res.json({
					...response,
					status: 1,
					message: 'Done',
				});
			} catch (err) {
				res.json({
					...response,
					message: 'Error',
				});
			}
		}
	} else {
		res.json({
			...response,
			message: 'Not authenticated',
		});
	}
});

// DELETE SKIN
router.delete('/:charId/moves/:slug', async (req, res) => {
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		authorization: `Bearer ${process.env.AUTH}`,
	};
	// !!!

	const { authorization } = req.headers;
	const response = {
		status: 0,
		message: '',
	};

	//
	if (!authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	}

	if (BACKEND_USER.authorization === authorization) {
		const { charId, slug } = req.params;
		try {
			const moves = await Characters.updateOne(
				{
					_id: charId,
				},
				{
					$pull: {
						moves: {
							slug: slug,
						},
					},
				}
			);
			res.json({
				...response,
				status: 1,
				message: 'Done',
			});
		} catch (err) {
			res.json({
				...response,
				message: 'Error',
			});
		}
	} else {
		res.json({
			...response,
			message: 'Not authenticated',
		});
	}
});

// PATCH SKIN
router.patch('/:charId/moves/:slug', async (req, res) => {
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		authorization: `Bearer ${process.env.AUTH}`,
	};
	// !!!

	const { authorization } = req.headers;
	const response = {
		status: 0,
		message: '',
	};

	//
	if (!authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	}

	if (BACKEND_USER.authorization === authorization) {
		const { charId, slug } = req.params;
		const { name, commands, annotation } = req.body;

		if (!name || !commands) {
			res.json({
				...response,
				message: 'Missing data',
			});
		} else {
			try {
				const slugId = stringify(name);
				const moves = await Characters.updateOne(
					{
						_id: charId,
						'moves.slug': slug,
					},
					{
						$set: {
							'moves.$.name': name,
							'moves.$.slug': slugId,
							'moves.$.commands': commands,
							'moves.$.annotation': annotation,
						},
					}
				);
				res.json({
					...response,
					status: 1,
					message: 'Done',
				});
			} catch (err) {
				res.json({
					...response,
					message: 'Error',
				});
			}
		}
	} else {
		res.json({
			...response,
			message: 'Missing data',
		});
	}
});

module.exports = router;
