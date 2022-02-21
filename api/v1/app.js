const express = require('express');
const app = express();

// utils
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const mongoose = require('mongoose');

// middleware
app.use(bodyParser.json());
app.use(cors());

// ROUTES

// login
const routeLogin = require('./routes/login');
app.use('/login', routeLogin);

// check authentication
const routeCheckAuth = require('./routes/checkAuth');
app.use('/check-auth', routeCheckAuth);

// characters
const routeCharacters = require('./routes/characters');
app.use('/characters', routeCharacters);

// skins
const routeSkins = require('./routes/skins');
app.use('/characters', routeSkins);

// moves
const routeMoves = require('./routes/moves');
app.use('/characters', routeMoves);

// fatalities
const routeFatalities = require('./routes/fatalities');
app.use('/characters', routeFatalities);

// specials
const routeSpecials = require('./routes/specials');
app.use('/characters', routeSpecials);

// brutalities
const routeBrutalities = require('./routes/brutalities');
app.use('/characters', routeBrutalities);

// combos
const routeCombos = require('./routes/combos');
app.use('/characters', routeCombos);

// base route
app.get('/', (req, res) => {
	res.send('Welcome');
});

// connect
mongoose
	.connect(process.env.DB_CONNECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database Connected');
	})
	.catch((err) => {
		console.log(err);
	});

// listening
const port = process.env.PORT || 3000;
app.listen(port);
