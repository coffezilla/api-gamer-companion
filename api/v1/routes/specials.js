const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET SKINS
router.get('/:charId/specials', async (req, res) => {
	const { charId } = req.params;
	try {
		const specials = await Characters.find({ _id: charId }, { specials: 1 });
		res.json(specials);
	} catch (err) {
		res.json(err);
	}
});

// GET SKINS SPECIFY
router.get('/:charId/specials/:slug', async (req, res) => {
	const { charId, slug } = req.params;
	const response = {
		status: 0,
		message: '',
	};
	try {
		const special = await Characters.find(
			{ _id: charId },
			{
				specials: {
					$elemMatch: { slug: slug },
				},
			}
		);

		res.json({
			...response,
			status: 1,
			message: 'Done',
			move: special[0].specials[0],
		});
	} catch (err) {
		res.json({
			...response,
			message: 'Error',
		});
	}
});

// POST SKINS
router.post('/:charId/specials', async (req, res) => {
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
							specials: {
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
router.delete('/:charId/specials/:slug', async (req, res) => {
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
			const specials = await Characters.updateOne(
				{
					_id: charId,
				},
				{
					$pull: {
						specials: {
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
router.patch('/:charId/specials/:slug', async (req, res) => {
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
				const specials = await Characters.updateOne(
					{
						_id: charId,
						'specials.slug': slug,
					},
					{
						$set: {
							'specials.$.name': name,
							'specials.$.slug': slugId,
							'specials.$.commands': commands,
							'specials.$.annotation': annotation,
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
