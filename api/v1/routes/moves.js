const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET SKINS
router.get('/:charId/moves', async (req, res) => {
	const { charId } = req.params;
	try {
		const moves = await Characters.find({ _id: charId }, { moves: 1 });
		res.json(moves);
	} catch (err) {
		res.json(err);
	}
});

// GET SKINS SPECIFY
router.get('/:charId/moves/:movSlug', async (req, res) => {
	const { charId, movSlug } = req.params;
	try {
		const moves = await Characters.find(
			{ _id: charId },
			{
				moves: {
					$elemMatch: { slug: movSlug },
				},
			}
		);
		res.json(moves);
	} catch (err) {
		res.json(err);
	}
});

// POST SKINS
router.post('/:charId/moves', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId } = req.params;
		const { name, commands } = req.body;

		if (!name || !commands) {
			res.json('Missing data');
		} else {
			try {
				// slugify
				const slug = stringify(name);
				const characters = await Characters.updateOne(
					{ _id: charId },
					{
						$push: {
							moves: {
								name: name,
								slug: slug,
								commands: commands,
							},
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

// DELETE SKIN
router.delete('/:charId/moves/:movSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, movSlug } = req.params;
		try {
			const moves = await Characters.updateOne(
				{
					_id: charId,
				},
				{
					$pull: {
						moves: {
							slug: movSlug,
						},
					},
				}
			);
			res.json(moves);
		} catch (err) {
			res.json(err);
		}
	} else {
		res.json('not authenticated');
	}
});

// PATCH SKIN
router.patch('/:charId/moves/:movSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, movSlug } = req.params;
		const { name, commands } = req.body;

		if (!name || !commands) {
			res.json('Missing data');
		} else {
			try {
				const slug = stringify(name);
				const moves = await Characters.updateOne(
					{
						_id: charId,
						'moves.slug': movSlug,
					},
					{
						$set: {
							'moves.$.name': name,
							'moves.$.slug': slug,
							'moves.$.commands': commands,
						},
					}
				);
				res.json(moves);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json('not authenticated');
	}
});

module.exports = router;
