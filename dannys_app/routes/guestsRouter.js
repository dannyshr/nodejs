const express = require('express');
const router = express.Router();
const enforceGuest = require('../middlewares/enforce-guest');

router.get('/welcome', enforceGuest, (req, res, next) => {
    res.render('welcome', {});
});

module.exports = router;
