'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

     await queryInterface.createTable('MenuItem', {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
         allowNull: false
       },
       title: {
         type: Sequelize.STRING,
         allowNull: false
       },
       picture: {
         type: Sequelize.STRING,
         allowNull: false
       },
       cost: {
         type: Sequelize.FLOAT,
         allowNull: false
       },
       callQuantity: {
         type: Sequelize.INTEGER,
         allowNull: true,
         default: 0
       },
       description: {
         type: Sequelize.TEXT,
         allowNull: true
       }
     });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('MenuItem');
  }
};
