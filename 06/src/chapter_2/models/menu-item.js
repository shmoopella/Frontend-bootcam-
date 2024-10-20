"use strict"

const { DataTypes } = require('sequelize');
const db = require("../sequelize-database");

module.exports = (sequelize, DataTypes) => {
  const MenuItem = db.define('MenuItem', {
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
  }, {
    tableName: 'MenuItem'
  });

  MenuItem.associate = models => {
    MenuItem.belongsToMany(models.Order, { through: 'OrderMenuItems', foreignKey: 'menuItemId' });
  };

  return MenuItem;
};



