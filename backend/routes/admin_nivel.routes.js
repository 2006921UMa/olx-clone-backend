// routes/admin_nivel.routes.js

const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, (req, res) => {
  if (!req.user || typeof req.user.isAdmin !== 'number') {
    return res.status(403).json({ message: 'Utilizador não autenticado.' });
  }

  const niveis = {
    0: 'utilizador',
    1: 'operador',
    2: 'supervisor',
    3: 'gestor'
  };

  const nivel = niveis[req.user.isAdmin] || 'desconhecido';

  res.json({
    nome: req.user.nome,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    nivel
  });
});

module.exports = router;