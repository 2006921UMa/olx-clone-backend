// routes/category.routes.js

const express = require('express');
const router = express.Router();

// Importar apenas o modelo necessário
const { category } = require('../models/init.models');

// Criar nova categoria
router.post('/', async (req, res) => {
  try {
    const { name, slug, image } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: 'Nome e slug são obrigatórios.' });
    }

    const new_category = await category_id.create({ name, slug, image });
    res.status(201).json(new_category);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar categoria.', error: err.message });
  }
});

// Listar todas as categorias
router.get('/', async (req, res) => {
  try {
    const categorias = await category.findAll({
      attributes: ['id', 'name', 'slug', 'image'],
      order: [['id', 'ASC']],
    });
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar categorias.', error: err.message });
  }
});

module.exports = router;