// js/XXXXXX-add-slug-to-categories.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('categories', 'slug', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      defaultValue: 'sem-slug' // Evita erro com dados antigos
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('categories', 'slug');
  }
};

