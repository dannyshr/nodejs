const express = require('express');
const router = express.Router();

router.get('/authenticate',(req, res, next) => {
    res.send('githubRouter authenticate');
});

router.get('/callback',(req, res, next) => {
    res.send('githubRouter callback');
});


module.exports = router;
