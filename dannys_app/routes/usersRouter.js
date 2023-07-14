const express = require('express');
const router = express.Router();
const inputValidator = require('../middlewares/inputValidator');

const { addSymbol, dashboard } = require('../controllers/users/usersController');
const { addSymbolValidator } = require('../controllers/users/usersValidator');

router.get('/dashboard', dashboard);

router.get('/logout',(req, res, next) => {
    res.send('usersRouter logout');
});

router.post('/symbol', inputValidator(addSymbolValidator), addSymbol);

module.exports = router;
