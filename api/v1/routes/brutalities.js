const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET SKINS
router.get('/:charId/brutalities', async (req, res) => {
	const { charId } = req.params;
	try {
		const brutalities = await Characters.find(
			{ _id: charId },
			{ brutalities: 1 }
		);
		res.json(brutalities);
	} catch (err) {
		res.json(err);
	}
});

// GET SKINS SPECIFY
router.get('/:charId/brutalities/:bruSlug', async (req, res) => {
	const { charId, bruSlug } = req.params;
	try {
		const brutalities = await Characters.find(
			{ _id: charId },
			{
				brutalities: {
					$elemMatch: { slug: bruSlug },
				},
			}
		);
		res.json(brutalities);
	} catch (err) {
		res.json(err);
	}
});

// POST SKINS
router.post('/:charId/brutalities', async (req, res) => {
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
							brutalities: {
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
router.delete('/:charId/brutalities/:bruSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, bruSlug } = req.params;
		try {
			const brutalities = await Characters.updateOne(
				{
					_id: charId,
				},
				{
					$pull: {
						brutalities: {
							slug: bruSlug,
						},
					},
				}
			);
			res.json(brutalities);
		} catch (err) {
			res.json(err);
		}
	} else {
		res.json('not authenticated');
	}
});

// PATCH SKIN
router.patch('/:charId/brutalities/:bruSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, bruSlug } = req.params;
		const { name, commands } = req.body;

		if (!name || !commands) {
			res.json('Missing data');
		} else {
			try {
				const slug = stringify(name);
				const brutalities = await Characters.updateOne(
					{
						_id: charId,
						'brutalities.slug': bruSlug,
					},
					{
						$set: {
							'brutalities.$.name': name,
							'brutalities.$.slug': slug,
							'brutalities.$.commands': commands,
						},
					}
				);
				res.json(brutalities);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json('not authenticated');
	}
});

module.exports = router;
