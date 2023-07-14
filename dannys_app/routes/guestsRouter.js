const express = require('express');
const router = express.Router();

router.use('/welcome',(req, res, next) => {
    res.send('welcome from guestsRouter');
});

module.exports = router;
