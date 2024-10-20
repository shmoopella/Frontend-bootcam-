"use strict"

const Sequelize= require("sequelize");

const sequelize = new Sequelize("cafedb", "admin", "admin", {
  dialect: "postgres",
  host: 'localhost',
  port: 5432,
  define: {
    timestamps: false
  }
});

const MenuItem = sequelize.define('MenuItem', {
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

const Order = sequelize.define('Order', {
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
    allowNull: true
  }
});

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  orders: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    allowNull: true
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false
  }
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

User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(MenuItem);

sequelize.sync().catch(error => {
  console.log(error);
});
