// migrations/XXXXXXXXXXXXXX-add-more-fields-to-users.js

'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'telefone', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'telemovel', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'morada', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users', 'genero', {
      type: Sequelize.ENUM('M', 'F', 'O'),
      allowNull: true,
      comment: 'M = Masculino, F = Feminino, O = Outro'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'telefone');
    await queryInterface.removeColumn('users', 'telemovel');
    await queryInterface.removeColumn('users', 'morada');
    await queryInterface.removeColumn('users', 'genero');
  }
};
