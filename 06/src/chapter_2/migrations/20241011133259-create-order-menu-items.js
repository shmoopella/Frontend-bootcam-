'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderMenuItems', {
      orderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Order',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      menuItemId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MenuItem',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderMenuItems');
  }
};
