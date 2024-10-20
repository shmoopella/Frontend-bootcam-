'use strict';

const {DataTypes} = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('MenuItem', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cost: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      callQuantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    });

  },


  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('MenuItem');
  }
};
