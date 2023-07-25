const express = require('express');
const router = express.Router();
const inputValidator = require('../middlewares/inputValidator');
const enforceUser = require('../middlewares/enforce-user');

const { addSymbol, dashboard } = require('../controllers/users/usersController');
const { addSymbolValidator } = require('../controllers/users/usersValidator');

//router.use(enforceUser);

router.get('/dashboard', dashboard);

router.get('/logout',(req, res, next) => {
    req.logout(() => {});
    res.redirect('/welcome');
});

router.post('/symbol', inputValidator(addSymbolValidator), addSymbol);

module.exports = router;
