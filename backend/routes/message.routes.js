// routes/message.routes.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const verifyToken = require('../middleware/verifyToken');

// Enviar nova mensagem
router.post('/', verifyToken, messageController.sendMessage);

// Ver todas as mensagens (admin ou geral)
router.get('/', verifyToken, messageController.getAllMessages);

// Listar mensagens por utilizador
router.get('/user/:user_id', verifyToken, messageController.getMessagesByUser);

 // Listar mensagens por anúncio
router.get('/ad/:ad_id', verifyToken, messageController.getMessagesByAd);

// Ver uma mensagem por ID
router.get('/:id', verifyToken, messageController.getMessageById);

// Atualizar uma mensagem
router.put('/:id', verifyToken, messageController.updateMessage);

// Apagar uma mensagem
router.delete('/:id', verifyToken, messageController.deleteMessage);

module.exports = router;