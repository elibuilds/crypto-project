const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const cryptoController = require('../controllers/cryptoController');

router.get('/crypto', cryptoController.getAllCryptos);
router.get('/crypto/gainers', cryptoController.getTopGainers);
router.get('/crypto/new', cryptoController.getNewListings);
router.post('/crypto', auth, cryptoController.createCrypto);

module.exports = router;
