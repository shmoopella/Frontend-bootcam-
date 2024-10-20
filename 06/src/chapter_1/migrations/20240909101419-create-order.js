'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Order', {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false
       },
       isActive: {
         type: Sequelize.BOOLEAN,
         allowNull: false
       },
       items: {
         type: Sequelize.ARRAY(Sequelize.INTEGER),
         defaultValue: []
       }

     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Order');
  }
};
