const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/authenticate', (req, res, next) => {
    auth.authenticate('github', {scope: ['user:email']});
    //res.send('githubRouter authenticate');
});

router.get('/callback',(req, res, next) => {
    res.send('githubRouter callback');
});


module.exports = router;
