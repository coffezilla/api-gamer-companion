const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET SKINS
router.get('/:charId/skins', async (req, res) => {
	const { charId } = req.params;
	try {
		const skins = await Characters.find({ _id: charId }, { skins: 1 });
		res.json(skins);
	} catch (err) {
		res.json(err);
	}
});

// GET SKINS SPECIFY
router.get('/:charId/skins/:skiSlug', async (req, res) => {
	const { charId, skiSlug } = req.params;
	try {
		const skins = await Characters.find(
			{ _id: charId },
			{
				skins: {
					$elemMatch: { slug: skiSlug },
				},
			}
		);
		res.json(skins);
	} catch (err) {
		res.json(err);
	}
});

// POST SKINS
router.post('/:charId/skins', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId } = req.params;
		const { name, is_dlc } = req.body;

		if (!name || is_dlc === null) {
			res.json('Missing data');
		} else {
			try {
				// slugify
				const slug = stringify(name);
				const characters = await Characters.updateOne(
					{ _id: charId },
					{
						$push: {
							skins: {
								name: name,
								slug: slug,
								is_dlc: is_dlc,
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
router.delete('/:charId/skins/:skiSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, skiSlug } = req.params;
		try {
			const skin = await Characters.updateOne(
				{
					_id: charId,
				},
				{
					$pull: {
						skins: {
							slug: skiSlug,
						},
					},
				}
			);
			res.json(skin);
		} catch (err) {
			res.json(err);
		}
	} else {
		res.json('not authenticated');
	}
});

// PATCH SKIN
router.patch('/:charId/skins/:skiSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, skiSlug } = req.params;
		const { name, is_dlc } = req.body;

		if (!name || !is_dlc === null) {
			res.json('Missing data');
		} else {
			try {
				const slug = stringify(name);
				const skin = await Characters.updateOne(
					{
						_id: charId,
						'skins.slug': skiSlug,
					},
					{
						$set: {
							'skins.$.name': name,
							'skins.$.slug': slug,
							'skins.$.is_dlc': is_dlc,
						},
					}
				);
				res.json(skin);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json('not authenticated');
	}
});

module.exports = router;
