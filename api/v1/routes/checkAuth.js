const express = require('express');
const router = express.Router();

// GET CHECK AUTH
router.get('/', (req, res) => {
	// !!!
	// THIS DATA SHOULD BE RETRIEVED FROM THE SERVER
	const BACKEND_USER = {
		email: process.env.USER_EMAIL,
		authorization: `Bearer ${process.env.AUTH}`,
	};
	// !!!

	const { email } = req.query;
	const { authorization } = req.headers;

	const response = {
		status: 0,
		timestamp: Date.now,
		user: {},
		email: '',
		message: '',
	};

	//
	if (!authorization) {
		return res.status(403).json({ error: 'No credentials sent!' });
	}

	if (
		BACKEND_USER.email === email &&
		BACKEND_USER.authorization === authorization
	) {
		res.json({
			...response,
			status: 1,
			email: email,
			message: 'Authenticated',
		});
	} else {
		res.json({
			...response,
			message: 'Not Authenticated',
		});
	}
});

module.exports = router;
