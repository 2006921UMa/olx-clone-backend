// scripts/seedAds.js

// Recriar 21 anúncios com as imagens
// node seedAds.js

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const db = require("../models/init.models"); // depois do dotenv
const { Ad } = db;
// const { ad } = require("../models/init.models"); // mesma coisa


console.log("Ligação a MySQL como:", process.env.DB_USER);


async function seedAds() {
  try {
    await db.sequelize.sync();

    // Apagar todos
    await Ad.destroy({ where: {} });
    await db.sequelize.query("ALTER TABLE Ads AUTO_INCREMENT = 1");

    const ads = [];

    for (let i = 1; i <= 21; i++) {
      const number = String(i).padStart(4, "0");

      ads.push({
        title: `Anúncio ${i}`,
        description: `Descrição do anúncio número ${i}.`,
        price: (i * 10).toFixed(2),
        location: "Funchal",
        has_video: false,
        image: `ad_${number}.jpg`,
        category_id: (i % 4) + 1, // categoria entre 1 e 4
        user_id: 1, //  1 é admin ou outro utilizador existente
      });
    }

    await Ad.bulkCreate(ads);
    console.log("Anúncios inseridos com sucesso.");
    process.exit();
  } catch (err) {
    console.error("Erro ao semear anúncios:", err);
    process.exit(1);
  }
}

seedAds();
