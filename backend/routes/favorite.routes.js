// routes/favorite.routes.js

const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favorite.controller');
const verifyToken = require('../middleware/verifyToken');

// Seguir um anúncio
router.post('/', verifyToken, favoriteController.followAd);

// Deixar de seguir um anúncio
router.delete('/:ad_id', verifyToken, favoriteController.unfollowAd);

// Listar todos os anúncios seguidos pelo utilizador autenticado
router.get('/', verifyToken, favoriteController.getfollowed_ads);

console.log (verifyToken);

module.exports = router;
