// routes/user.routes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

// ====================
// Rotas públicas
// ====================

// Registo público (sem token, só utilizador normal)
router.post('/register', (req, res) => {
  if (req.body.isAdmin && parseInt(req.body.isAdmin) > 0) {
    return res.status(403).json({ error: 'Não autorizado a criar admins sem autenticação.' });
  }
  userController.createUser(req, res);
});

// ============================
// Rotas para administradores
// ============================

router.post('/', verifyToken, isAdmin, userController.createUser);
router.get('/', verifyToken, isAdmin, userController.getAllUsers);
router.put('/:id', verifyToken, isAdmin, userController.updateUser);
router.delete('/:id', verifyToken, isAdmin, userController.deleteUser);

// ======================================================
// Rotas autenticadas (qualquer utilizador autenticado)
// ======================================================

router.get('/me', verifyToken, userController.getProfile);
router.put('/me', verifyToken, userController.updateOwnProfile);
router.get('/:id', verifyToken, userController.getUserById);

module.exports = router;
