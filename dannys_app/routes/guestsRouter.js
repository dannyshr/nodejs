const express = require('express');
const router = express.Router();

router.get('/welcome',(req, res, next) => {
    res.render('welcome', {});
});

module.exports = router;
