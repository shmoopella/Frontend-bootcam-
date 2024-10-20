"use strict"

const { DataTypes } = require('sequelize');
const db = require("../sequelize-database");
const MenuItem= require("./menu-item");
const User = require("./user");

const Order = db.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  items: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true
  }
},{
  tableName: 'Order'
});

module.exports = Order;
