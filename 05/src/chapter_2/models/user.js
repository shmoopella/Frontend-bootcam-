"use strict"

const { DataTypes } = require('sequelize');
const db = require("../sequelize-database");
const Order= require("./order");

const User = db.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orders: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'User'
});

module.exports = User;
