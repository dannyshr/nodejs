const express = require('express');
const router = express.Router();

const { distincetSymbols } = require('../controllers/api/controller');
const { distinct } = require('../models/mongo/symbol-value');

router.get('/symbols', distincetSymbols);

module.exports = router;