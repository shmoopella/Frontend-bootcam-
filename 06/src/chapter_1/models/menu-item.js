"use strict"

const { DataTypes } = require('sequelize');
const db = require("../sequelize-database");

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
    default: 0
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'MenuItem'
});

module.exports = MenuItem;
