const express = require('express');
const router = express.Router();
const Characters = require('../models/Characters');
const stringify = require('../helper/utils');

// GET SKINS
router.get('/:charId/fatalities', async (req, res) => {
	const { charId } = req.params;
	try {
		const fatalities = await Characters.find(
			{ _id: charId },
			{ fatalities: 1 }
		);
		res.json(fatalities);
	} catch (err) {
		res.json(err);
	}
});

// GET SKINS SPECIFY
router.get('/:charId/fatalities/:fatSlug', async (req, res) => {
	const { charId, fatSlug } = req.params;
	try {
		const fatalities = await Characters.find(
			{ _id: charId },
			{
				fatalities: {
					$elemMatch: { slug: fatSlug },
				},
			}
		);
		res.json(fatalities);
	} catch (err) {
		res.json(err);
	}
});

// POST SKINS
router.post('/:charId/fatalities', async (req, res) => {
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
							fatalities: {
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
router.delete('/:charId/fatalities/:fatSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, fatSlug } = req.params;
		try {
			const fatalities = await Characters.updateOne(
				{
					_id: charId,
				},
				{
					$pull: {
						fatalities: {
							slug: fatSlug,
						},
					},
				}
			);
			res.json(fatalities);
		} catch (err) {
			res.json(err);
		}
	} else {
		res.json('not authenticated');
	}
});

// PATCH SKIN
router.patch('/:charId/fatalities/:fatSlug', async (req, res) => {
	if (req.query.auth == process.env.AUTH) {
		const { charId, fatSlug } = req.params;
		const { name, commands } = req.body;

		if (!name || !commands) {
			res.json('Missing data');
		} else {
			try {
				const slug = stringify(name);
				const fatalities = await Characters.updateOne(
					{
						_id: charId,
						'fatalities.slug': fatSlug,
					},
					{
						$set: {
							'fatalities.$.name': name,
							'fatalities.$.slug': slug,
							'fatalities.$.commands': commands,
						},
					}
				);
				res.json(fatalities);
			} catch (err) {
				res.json(err);
			}
		}
	} else {
		res.json('not authenticated');
	}
});

module.exports = router;
