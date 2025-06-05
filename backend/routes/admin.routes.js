// routes/admin.routes.js

const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

const db = require('../models/init.models'); 

// Rota para listar todos os anúncios (admin)
router.get('/anuncios', verifyToken, isAdmin, async (req, res) => {
  try {
    const anuncios = await db.ad.findAll({
      include: [{ model: db.user, attributes: ['id', 'name', 'email'] }]
    });
    res.json(anuncios);
  } catch (error) {
    console.error('Erro ao obter anúncios:', error);
    res.status(500).json({ message: 'Erro ao carregar anúncios' });
  }
});

// Apagar anúncio por ID (apenas admins)
router.delete('/anuncios/:id', verifyToken, isAdmin, async (req, res) => {
  const id = req.params.id;

  try {
    const anuncio = await db.ad.findByPk(id);

    if (!anuncio) {
      return res.status(404).json({ message: 'Anúncio não encontrado' });
    }

    await anuncio.destroy(); // Apaga o registo do anúncio
    res.json({ message: 'Anúncio apagado com sucesso' });

  } catch (err) {
    console.error('Erro ao apagar anúncio:', err);
    res.status(500).json({ message: 'Erro interno ao apagar anúncio' });
  }
});

// Rota geral para todos administradores (isAdmin >= 1)
router.get('/painel', verifyToken, isAdmin, (req, res) => {
  res.json({ message: `Olá, admin ${req.user.nome}! Tens acesso ao painel geral.` });
});

// Rota apenas para operadores (isAdmin === 1)
router.get('/operador', verifyToken, isAdmin, (req, res) => {
  if (req.user.isAdmin === 1) {
    res.json({ message: `Bem-vindo Operador ${req.user.nome}!` });
  } else {
    res.status(403).json({ message: 'Acesso reservado a operadores (nível 1).' });
  }
});

// Rota apenas para supervisores (isAdmin === 2)
router.get('/supervisor', verifyToken, isAdmin, (req, res) => {
  if (req.user.isAdmin === 2) {
    res.json({ message: `Bem-vindo Supervisor ${req.user.nome}!` });
  } else {
    res.status(403).json({ message: 'Acesso reservado a supervisores (nível 2).' });
  }
});

// Rota apenas para gestores gerais (isAdmin === 3)
router.get('/gestor', verifyToken, isAdmin, (req, res) => {
  if (req.user.isAdmin === 3) {
    res.json({ message: `Olá, Gestor Geral ${req.user.nome}! Acesso total concedido.` });
  } else {
    res.status(403).json({ message: 'Acesso reservado ao gestor geral (nível 3).' });
  }
});

module.exports = router;
