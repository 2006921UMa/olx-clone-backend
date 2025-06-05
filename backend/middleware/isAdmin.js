// middleware/isAdmin.js

const db = require('../models/init.models');

module.exports = (req, res, next) => {
  if (!req.user || typeof req.user.isAdmin !== 'number') {
    return res.status(401).json({ message: 'Token inválido ou utilizador não autenticado.' });
  }

  if (req.user && req.user.isAdmin >= 1) {  // autorizado acima valor 1 até 3 ou mais
    next(); // Acesso permitido
  } else {
    res.status(403).json({ message: 'Acesso negado. Apenas administradores têm permissão.' });
  }
};

