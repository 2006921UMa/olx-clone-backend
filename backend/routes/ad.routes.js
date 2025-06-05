// routes/ad.routes.js

const express = require('express');
const router = express.Router();
const adController = require('../controllers/ad.controller');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/upload');

// ============================
// Rotas Públicas
// ============================
router.get('/', adController.getAllAds);           // Listar todos os anúncios
router.get('/:id', adController.getAdById);        // Obter anúncio por ID

// =============================
// Rotas Protegidas com Upload
// =============================
router.post('/', verifyToken, upload.single('image'), adController.createAd);
//router.post('/', upload.single('image'), adController.createAd); // Para teste. Sem segurança token
// router.post('/', upload.single('image'), adController.createAd);  // Para teste. Sem segurança token
router.put('/:id', verifyToken, upload.single('image'), adController.updateAd);

// ============================
// Rota Protegida sem Upload
// ============================
router.delete('/:id', verifyToken, adController.deleteAd);

module.exports = router;

