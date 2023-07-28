const express = require('express');
const router = express.Router();
const enforceUser = require('../middlewares/enforce-user');

const { findBooks, fetchBooks } = require('../controllers/books/controller');

router.get('/home', enforceUser, fetchBooks);

router.post('/search', enforceUser, findBooks);

module.exports = router;
