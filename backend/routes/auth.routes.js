// routes/auth.routes.js

const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Rota para registo de utilizador
router.post('/signup', authController.signup);

// Rota para login
router.post('/login', authController.login);

module.exports = router;
