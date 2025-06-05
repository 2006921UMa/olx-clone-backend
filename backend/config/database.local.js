// config/database.local.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false
    // SSL não suportado no XAMPP/MySQL local
  }
);

sequelize.authenticate()
  .then(() => console.log('Ligação LOCAL (MySQL) com sucesso!'))
  .catch(err => console.error('Erro ao ligar LOCAL:', err));

module.exports = sequelize;
