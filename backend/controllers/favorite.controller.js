// controllers/favorite.controller.js

const db = require('../models/init.models');
const followed_ad = db.followed_ad;
const Ad = db.ad;

// Seguir um anúncio
exports.followAd = async (req, res) => {
  const { ad_id } = req.body;

  if (!ad_id) {
    return res.status(400).json({ message: 'É necessário fornecer o ID do anúncio.' });
  }

  try {
    const alreadyFollowed = await followed_ad.findOne({
      where: { user_id: req.user_id, ad_id }
    });

    if (alreadyFollowed) {
      return res.status(400).json({ message: 'Já está a seguir este anúncio.' });
    }

    const followed = await followed_ad.create({
      user_id: req.user_id,
      ad_id
    });

    res.status(201).json(followed);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao seguir anúncio.' });
  }
};

// Deixar de seguir um anúncio
exports.unfollowAd = async (req, res) => {
  try {
    const ad_id = req.params.ad_id;

    const removed = await followed_ad.destroy({
      where: { user_id: req.user_id, ad_id: ad_id }
    });

    if (!removed) {
      return res.status(404).json({ message: 'Não estava a seguir este anúncio.' });
    }

    res.json({ message: 'Anúncio deixado de seguir com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deixar de seguir o anúncio.' });
  }
};

// Listar todos os anúncios seguidos pelo utilizador autenticado
exports.getfollowed_ads = async (req, res) => {
  try {
    const favorites = await db.followed_ad.findAll({
      where: { user_id: req.user_id },
      include: [
        {
          model: db.Ad,
          attributes: ['id', 'title', 'description', 'image', 'createdAt'],
          include: [
            { model: db.category_id, attributes: ['id', 'name'] },
            { model: db.user, attributes: ['id', 'name'] }
          ]
        }
      ]
    });

    res.json(favorites);
  } catch (error) {
    console.error("Erro ao listar favoritos:", error);
    res.status(500).json({ message: 'Erro ao listar anúncios seguidos.' });
  }
};
