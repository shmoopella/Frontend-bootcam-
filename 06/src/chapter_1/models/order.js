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
    defaultValue: [],
    allowNull: false
  }
},{
  tableName: 'Order'
});

Order.afterCreate(async (order, options) => {
  const items = order.items;
  if (items && Array.isArray(items)) {
    for (const menuItemId of items) {
      const menuItem = await MenuItem.findByPk(menuItemId);
      if (menuItem) {
        await menuItem.increment('callQuantity', { by: 1 });
      }
    }
  }

});
module.exports = Order;
