"use strict"

const { DataTypes } = require('sequelize');
const db = require("../sequelize-database");
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
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
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    orders: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      defaultValue: []
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        try {
          if (user.password) {
            console.log('Опачки мы тут!');
            const salt = await bcrypt.genSalt(10); // Генерация соли
            user.password = await bcrypt.hash(user.password, salt); // Хэширование пароля
            // await user.save();
            console.log('Опачки мы тут2!');
          }
        } catch (error) {
          throw error;
        }

      },
      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          // await user.save();
        }
      },
      beforeBulkCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10); // Генерация соли
          user.password = await bcrypt.hash(user.password, salt); // Хэширование пароля
          // await user.save();
        }
      },
      beforeBulkUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
          // await user.save();
        }
      }
    }
  });
  User.associate = models => {
    User.hasMany(models.Order, { foreignKey: 'userId' });
  };

  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};





