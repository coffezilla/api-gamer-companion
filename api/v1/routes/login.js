const express = require('express');
const router = express.Router();
require('dotenv/config');

// GET SKINS
router.post('/', async (req, res) => {
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		password: process.env.USER_PASSWORD,
		defaultToken: process.env.AUTH,
	};
	// !!!

	const { email, password } = req.body;
	console.log(req.body);
	const response = {
		token: BACKEND_USER.defaultToken,
		status: 0,
		timestamp: Date.now,
		user: '',
		message: '',
	};

	if (email === BACKEND_USER.email && password === BACKEND_USER.password) {
		res.json({
			...response,
			status: 1,
			user: {
				id: 1,
				email: email,
			},
			message: 'Logged',
		});
	} else {
		res.json({
			...response,
			message: 'Not Logged',
		});
	}
});

module.exports = router;
