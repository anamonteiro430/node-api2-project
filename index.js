const express = require('express');

const apiRouter = require('./api/api-router.js');

const server = express();

server.use(express.json()); //to parse json

server.use('/api', apiRouter); //for URLS beginning with /API

server.get('/', (req, res) => {
	res.send(
		`
        <h2>Node - Project 2
        `
	);
});

const port = 5000;
server.listen(port, () => {
	console.log(`\n*** Server running on http://localhost:${port}***\n`);
});
