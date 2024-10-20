"use strict"

const { DataTypes } = require('sequelize');
const db = require("../sequelize-database");
const MenuItem= require("./menu-item");


module.exports = (sequelize, DataTypes) => {
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
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  },{
    tableName: 'Order',
    hooks: {
      afterCreate: async (order, options) => {
        try {
          const items = order.items;
          if (items && Array.isArray(items)) {
            for (const menuItemId of items) {
              const menuItem = await MenuItem.findByPk(menuItemId);
              if (menuItem) {
                await menuItem.increment('callQuantity', { by: 1 });
              }
            }
          }
        } catch (error) {
          console.error('Ошибка в afterCreate хуке:', error);
        }
      }
    }
  });

  Order.associate = models => {
    Order.belongsToMany(models.MenuItem, { through: 'OrderMenuItems', foreignKey: 'orderId' });
  };

  return Order;
};
