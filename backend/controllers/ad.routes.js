// routes/ad.routes.js
// ligação ao utilizador autenticado e com proteção por token

const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad.controller');
const verifyToken = require('../middleware/verifyToken');

// Rotas públicas
router.get('/', adController.getAllAds);
router.get('/:id', adController.getAdById);

// Rotas protegidas
router.post('/', verifyToken, adController.createAd);
router.put('/:id', verifyToken, adController.updateAd);
router.delete('/:id', verifyToken, adController.deleteAd);

module.exports = router;
