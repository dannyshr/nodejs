const express = require('express');
const router = express.Router();
const inputValidator = require('../middlewares/inputValidator');
const enforceUser = require('../middlewares/enforce-user');

const { addSymbol, dashboard } = require('../controllers/users/usersController');
const { addSymbolValidator } = require('../controllers/users/usersValidator');

router.get('/dashboard', enforceUser, dashboard);

router.get('/logout', enforceUser, (req, res, next) => {
    req.logout(() => {});
    res.redirect('/welcome');
});

router.post('/symbol', enforceUser, inputValidator(addSymbolValidator), addSymbol);

module.exports = router;
