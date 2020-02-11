const express = require('express');

const Posts = require('./../data/db.js');

//this router handles requests beggininf in `/api`
const router = express.Router();

module.exports = router;

//route handlers

router.get('/posts', (req, res) => {
	Posts.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'error' });
		});
});
