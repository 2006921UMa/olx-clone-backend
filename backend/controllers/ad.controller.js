// controllers/ad.controllers.js

// controllers/ad.controller.js

const db = require("../models/init.models");
const { Op, literal } = require("sequelize");

const Ad = db.ad;

if (!Ad) {
  throw new Error(
    "Modelo 'ad' não carregado. Verifica o nome no init.models.js."
  );
}

// Criar um novo anúncio
const createAd = async (req, res) => {
  console.log(" Req.file:", req.file); // Teste imagem recebida

  if (!req.file) {
  return res.status(400).json({ message: "Imagem não enviada." });
}
  try {
    const { title, description, price, location, category_id } = req.body;
    const image = req.file?.filename || null;

     // Usar o ID do utilizador autenticado
    const userId = req.user?.id;

    // console.log("[CREATE AD] Utilizador ID:", userId);
    // console.log("[CREATE AD] Ficheiro imagem:", image);

    if (!userId) {
      return res.status(401).json({ message: "Utilizador não autenticado." });
    }

    const novoAd = await db.ad.create({
      title,
      description,
      price,
      location,
      category_id,
      image,
      user_id: userId,
    });

    res.status(201).json(novoAd);
  } catch (err) {
    console.error(" Erro ao criar anúncio:", err);
    res.status(500).json({ message: "Erro ao criar anúncio" });
  }
};

// Listar anúncios
const getAllAds = async (req, res) => {
  try {
    const { category_id, order } = req.query;
    const where = {};
    if (category_id) where.category_id = category_id;

    let orderOption = [["createdAt", "DESC"]];
    switch (order) {
      case "price_asc":
        orderOption = [["price", "ASC"]];
        break;
      case "price_desc":
        orderOption = [["price", "DESC"]];
        break;
      case "rating_desc":
        orderOption = [
          [
            literal(
              "(SELECT AVG(stars) FROM ratings WHERE ratings.ad_id = ad.id)"
            ),
            "DESC",
          ],
        ];
        break;
    }

    const ads = await Ad.findAll({
      where,
      order: orderOption,
      include: [
        { model: db.category },
        { model: db.user },
        { model: db.rating },
      ],
    });

    res.json(ads);
  } catch (error) {
    console.error("Erro ao obter anúncios:", error);
    res
      .status(500)
      .json({ message: "Erro ao obter anúncios", error: error.message });
  }
};

// Obter anúncio por ID
const getAdById = async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id, {
      include: [
        { model: db.user, attributes: ["id", "name"] },
        { model: db.category, attributes: ["id", "name"] },
      ],
    });

    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const adWithImage = {
      ...ad.toJSON(),
      image:
        ad.image && !ad.image.startsWith("http")
          ? `${baseUrl}/uploads/${ad.image}`
          : ad.image || null,
    };

    res.json(adWithImage);
  } catch (error) {
    console.error("Erro ao obter anúncio:", error);
    res.status(500).json({ message: "Erro ao obter anúncio." });
  }
};

// Atualizar anúncio
const updateAd = async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    if (ad.user_id !== req.user_id && !req.userIsAdmin) {
      return res
        .status(403)
        .json({ message: "Sem permissão para editar este anúncio." });
    }

    const {
      title,
      description,
      category_id,
      price,
      location,
      has_video,
      image: image_url,
    } = req.body;

    if (title) ad.title = title;
    if (description) ad.description = description;
    if (category_id) ad.category_id = category_id;
    if (price) ad.price = price;
    if (location) ad.location = location;
    if (has_video !== undefined) ad.has_video = has_video;

    if (req.file) {
      ad.image = req.file.filename;
      console.log("Imagem recebida:", req.file.filename);
    } else if (image_url && image_url.startsWith("http")) {
      ad.image = image_url;
    } else {
      console.log(" Nenhuma imagem recebida!");
    }

    await ad.save();
    res.json(ad);
  } catch (error) {
    console.error("Erro ao atualizar anúncio:", error);
    res.status(500).json({ message: "Erro ao atualizar anúncio." });
  }
};

// Apagar anúncio
const deleteAd = async (req, res) => {
  try {
    const ad = await Ad.findByPk(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Anúncio não encontrado." });
    }

    if (ad.user_id !== req.user_id && !req.userIsAdmin) {
      return res
        .status(403)
        .json({ message: "Sem permissão para apagar este anúncio." });
    }

    await ad.destroy();
    res.json({ message: "Anúncio apagado com sucesso." });
  } catch (error) {
    console.error("Erro ao apagar anúncio:", error);
    res.status(500).json({ message: "Erro ao apagar anúncio." });
  }
};

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
};
