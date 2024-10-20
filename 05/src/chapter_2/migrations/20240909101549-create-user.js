'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('User', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      orders: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: true
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('User');
  }
};
