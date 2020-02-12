const express = require('express');

const Posts = require('./../data/db.js');

//this router handles requests beggininf in `/api`
const router = express.Router();

module.exports = router;

//route handlers

router.get('/posts', (req, res) => {
	console.log('yo');
	Posts.find()
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'error' });
		});
});

router.get('/posts/:id', (req, res) => {
	const { id } = req.params;

	Posts.findById(id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ errorMessage: 'error' });
		});
});

router.get('/posts/:id/comments', (req, res) => {
	const { id } = req.params;
	Posts.findPostComments(id)
		.then(comment => {
			console.log('comment', comment);

			if (comment.length === 0) {
				res.status(404).json({ errorMessage: '404' });
			} else {
				res.status(200).json(comment);
			}
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'error' });
		});
});

router.post('/posts', (req, res) => {
	const body = req.body;
	console.log(body);
	Posts.insert(body)
		.then(posted => {
			console.log('posted', posted);
			res.status(201).json(posted);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'error' });
		});
});

router.post('/posts/:id/comments', (req, res) => {
	const id = req.params.id;
	const body = { ...req.body, post_id: id };

	console.log('body', body);
	console.log('id', id);

	Posts.insertComment(body, id)
		.then(posted => {
			console.log('posted', posted);
			res.status(201).json(posted);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'error' });
		});
});

router.delete('/posts/:id', (req, res) => {
	const id = req.params.id;

	console.log('id', id);

	Posts.remove(id)
		.then(deleted => {
			console.log('number of posts now', deleted);
			res.status(200).json(deleted);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'error' });
		});
});

router.put('/posts/:id', (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	console.log('id', id);
	console.log('changes', changes);

	Posts.update(id, changes)
		.then(updated => {
			console.log('updated', updated);
			res.status(200).json(updated);
		})
		.catch(err => {
			res.status(500).json({ errorMessage: 'error' });
		});
});
