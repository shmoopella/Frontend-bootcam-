"use strict"
// Инициализируйте sequelize командой npx sequelize-cli init, после этого у вас должны создаться 4 папки: config, seeds, migrations, models.
// Для создания базы воспользуйтесь командой npx sequelize-cli db:create

const express = require('express');
const app = express();

const db = require("./sequelize-database");
const MenuItem = require("./models/menu-item");
const Order = require("./models/order");
const User = require("./models/user");

const menu = express.Router();
const orders = express.Router();
const waiters = express.Router();

menu.get("/menu", async (req, res) => {
  try {
    const menuData = await getMenu();
    res.send(menuData);
  } catch (error) {
    console.log("Ошибка при загрузке меню:", error);
    res.status(500).send("Ошибка сервера");
  }
});

orders.get("/orders", async (req, res) => {
  try {
    const orders = await getOrders();
    res.send(orders);
  } catch (error) {
    console.error("Ошибка при загрузке заказов:", error);
    res.status(500).send("Ошибка сервера");
  }
});

orders.post("/orders", async (req, res) => {
  try {
    const body = req.body;
    await createOrder(body);
    res.send("Заказ добавлен.");
  } catch (error) {
    res.status(500).send("Ошибка сервера");
  }
});

orders.put("/orders/:id", async (req, res) => {
  try {
    const body = req.body;
    const orderId = req.params.id;
    const updated = await updateOrder(orderId, body);
    if (updated) {
      res.send("Заказ обновлен.");
    } else {
      res.status(404).send("Заказ не найден.");
    }
  } catch (error) {
    console.error("Ошибка при обновлении заказа:", error);
    res.status(500).send("Ошибка сервера");
  }
})

orders.delete("/orders/:id", async (req, res) => {
  try {
    const orderId = req.params.id;
    const updated = await deleteOrder(orderId);
    if (updated) {
      res.send("Заказ закрыт.");
      console.log('Заказ закрыт.');
    } else {
      res.status(404).send("Заказ не найден.");
    }
  } catch (error) {
    console.error("Ошибка при обновлении заказа:", error);
    res.status(500).send("Ошибка сервера");
  }
});

waiters.post("/waiters", async (req, res) => {
  try {
    const body = req.body;
    await createUser(body);
    res.send("Пользователь добавлен.");
  } catch (error) {
    console.log("При добавлении пользователя произошла ошибка:", error);
    res.status(500).send("Ошибка сервера");
  }
});

app.use(express.json());
app.use('/api', menu);
app.use('/api', orders);
app.use('/api', waiters);

syncDB();

app.listen(3000, () => {
  console.log('Сервер слушает на порту 3000 :)');
});

async function syncDB() {
  try {
    await db.sync();
    console.log("Данные синхронизированы!");
  } catch (error) {
    console.log("Ошибка при синхронизации базы данных:", error);
    throw error;
  }
}

async function getMenu() {
  try {
    const response = await MenuItem.findAll({attributes: ['title', 'description'], raw: true});
    console.log('Меню отправлено.');
    console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
}
async function getOrders() {
  try {
    const response = await Order.findAll( {
      attributes: ['id'],
      where: {
        isActive: true
      },
      raw: true
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function createOrder(order) {
  try {
    Order.create(order);
  } catch (error) {
    throw error;
  }
}

async function updateOrder(orderId, data) {
  try {
    const result = await Order.update(data, {
      where: {
        id: orderId
      }
    });
    return result[0] > 0;
  } catch (error) {
    throw error;
  }
}
async function deleteOrder(orderId) {
  try {
    const result = await Order.update({ isActive: "false" }, { where: {id : orderId}});
    return result[0] > 0;
  } catch (error) {
    throw error;
  }
}

async function createUser(user) {
  try {
    User.create(user);
  } catch (error) {
    throw error;
  }
}
