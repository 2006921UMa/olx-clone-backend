// models/init.models.js 
// Carrega dinamicamente os modelos conforme o SGBD (MySQL/PostgreSQL)

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

const dialect = sequelize.getDialect(); // 'mysql' ou 'postgres'
const extension = `.${dialect}.js`;

// Mostrar os modelos carregados
console.log(`A carregar modelos com extensão: ${extension}`);

fs.readdirSync(__dirname)
  .filter(file => {
    const isValid = file !== 'init.models.js' && file.endsWith(extension);
    if (!isValid) {
      // console.log(`Ignorado: ${file}`);
    }
    return isValid;
  })
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelFunc = require(modelPath);

    if (typeof modelFunc === 'function') {
      const model = modelFunc(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      console.log(`Modelo carregado: ${model.name}`); // Teste
    } else {
      // console.warn(`Ignorado: ${file} não exporta uma função Sequelize válida.`);
    }
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
    // console.log(`Associação feita para: ${modelName}`); // Teste
  }
});

// ver o modelos carregados -> problema (falha)
// console.log("DEBUG db.ad:", db.ad ? "OK" : "FALHA");
// console.log("DEBUG db.rating:", db.rating ? "OK" : "FALHA");
// console.log("DEBUG MODELOS:", Object.keys(db));


// console.log('Modelos carregados:', Object.keys(db));

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
