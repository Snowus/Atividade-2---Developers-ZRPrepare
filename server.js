const express = require('express');
require('dotenv').config();
const cors = require('cors');
const db = require('./app/models');

const app = express();

const corsOptions = {
	origin: 'http://localhost:8081',
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json()); /* BodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
	express.urlencoded({extended: true}),
); /* BodyParser.urlencoded() is deprecated */

// simple route
app.get('/', (_, res) => {
	res.json({message: 'Welcome to events application.'});
});

require('./app/routes/event.routes')(app);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

// Set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
