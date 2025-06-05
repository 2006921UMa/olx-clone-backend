// config/database.js

// no terminal
// node -e "require('dotenv').config(); console.log(process.env.DB_USER)"    // Teste p/ ler as variáveis de ambiente


require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT, // usar valor do .env
    logging: false,

    // Ativar isto apenas se for PostgreSQL + SSL (ex: Render)
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

sequelize.authenticate()
  .then(() => {
    console.log(`Ligação a ${process.env.DB_DIALECT} como: ${process.env.DB_USER}`);
    console.log("Ligação à base de dados estabelecida com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao ligar à base de dados:", err);
  });

module.exports = sequelize;
