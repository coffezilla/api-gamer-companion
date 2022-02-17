const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET SKINS
router.get('/:charId/combos', async (req, res) => {
	const { charId } = req.params;
	try {
		const combos = await Characters.find({ _id: charId }, { combos: 1 });
		res.json(combos);
	} catch (err) {
		res.json(err);
	}
});

// GET SKINS SPECIFY
router.get('/:charId/combos/:comSlug', async (req, res) => {
	const { charId, comSlug } = req.params;
	try {
		const combos = await Characters.find(
			{ _id: charId },
			{
				combos: {
					$elemMatch: { slug: comSlug },
				},
			}
		);
		res.json(combos);
	} catch (err) {
		res.json(err);
	}
});

// POST SKINS
router.post('/:charId/combos', async (req, res) => {
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
							combos: {
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
router.delete('/:charId/combos/:comSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, comSlug } = req.params;
		try {
			const combos = await Characters.updateOne(
				{
					_id: charId,
				},
				{
					$pull: {
						combos: {
							slug: comSlug,
						},
					},
				}
			);
			res.json(combos);
		} catch (err) {
			res.json(err);
		}
	} else {
		res.json('not authenticated');
	}
});

// PATCH SKIN
router.patch('/:charId/combos/:comSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, comSlug } = req.params;
		const { name, commands } = req.body;

		if (!name || !commands) {
			res.json('Missing data');
		} else {
			try {
				const slug = stringify(name);
				const combos = await Characters.updateOne(
					{
						_id: charId,
						'combos.slug': comSlug,
					},
					{
						$set: {
							'combos.$.name': name,
							'combos.$.slug': slug,
							'combos.$.commands': commands,
						},
					}
				);
				res.json(combos);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json('not authenticated');
	}
});

module.exports = router;
