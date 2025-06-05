
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Ads', 'price', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    });

    await queryInterface.addColumn('Ads', 'location', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Ads', 'has_video', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Ads', 'price');
    await queryInterface.removeColumn('Ads', 'location');
    await queryInterface.removeColumn('Ads', 'has_video');
  }
};
