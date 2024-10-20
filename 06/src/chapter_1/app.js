"use strict"

const express = require('express');
const app = express();
app.set("view engine", "hbs");
app.use(express.static('public'));

const db = require("./sequelize-database");
const MenuItem = require("./models/menu-item");
const Order = require("./models/order");
const User = require("./models/user");

const main = express.Router();
const createOrder = express.Router();
const orderInfo = express.Router();
const menu = express.Router();

// const waiters = express.Router();

menu.get('/menu', async function (_, response){
  try {
    let menu = await MenuItem.findAll({attributes: ['title', 'picture', 'cost', 'description'], raw: true});
    response.render('menu.hbs', {
      items: menu
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Ошибка сервера");
  }
});

main.get('/', function(_, response) {
  response.render('main.hbs');
});

main.post('/', async function (request, response) {
  try {
    const id = request.body.waiterId;
    const orders = await getOrders(id);
    response.render('orders.hbs', {
      orders: orders
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Ошибка сервера");
  }
});

createOrder.get('/orders', async function (_, response) {
  try {
    const waitersId = (await User.findAll({attributes: ['id'], raw: true})) || [];
    const menuData = (await MenuItem.findAll({attributes: ['title'], raw: true})) || [];
    response.render('createOrder.hbs', {
      waiters: waitersId,
      menu: menuData
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Ошибка сервера");
  }
});

createOrder.post('/orders', async function(request, response){
  try {
    const {waiterId} = request.body;
    let menu;
    if (Array.isArray(request.body.menu)) {
     menu = request.body.menu;
    } else {
      menu = [];
      menu.push(request.body.menu);
    }
    let menuId = [];
    let itemId;
    for (let item of menu) {
      itemId = await MenuItem.findAll({attributes: ['id'], where: {title: item}});
      menuId.push(itemId.pop().id);
    }
    const newOrder = (await Order.create({isActive: 'true', items: menuId})).get({ plain: true });
    let userOrders = (await User.findByPk(waiterId, {attributes: ['orders'], raw:true})).orders;
    if (!userOrders) {
      userOrders = [];
    }
    let newUserOrders = [...userOrders, newOrder.id];
    let updated = await User.update({orders: newUserOrders}, {where: {id: waiterId}});
    const url = '/orders/' + newOrder.id.toString();
    response.redirect(url);
  } catch (error) {
    console.log(error);
    response.status(500).send("Ошибка! Проверьте корректность вводимых данных.");
  }
});

orderInfo.get('/orders/:id', async function(request, response) {
  try {
    let orderId = request.params.id;
    let order = await Order.findByPk(orderId, {attributes: ['id', 'isActive', 'items'], raw:true});
    let menuItems= [];
    let menuItem;
    let cost = 0;
    for (let item of order.items) {
      menuItem = await MenuItem.findByPk(item, {attributes:['title', 'picture', 'cost'], raw:true});
      menuItems.push(menuItem);
      cost += menuItem.cost;
    }
    response.render('orderInfo.hbs', {
      orderId: order.id,
      orderStatus: order.isActive,
      items: menuItems,
      amount: cost
    });
  } catch (error) {
    console.log(error);
    response.status(500).send('Ошибка при загрузке заказа.');
  }

});

orderInfo.post("/orders/:id", async (req, res) => {
  try {
    const orderId = req.body.orderId;
    const updated = await closeOrder(orderId);
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', main);
app.use('/', createOrder);
app.use('/', orderInfo);
app.use('/', menu);

// app.use('/api', orders);
// app.use('/api', waiters);

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

async function getOrders(waiterId) {
  try {
    const response = await User.findAll( {
      attributes: ['orders'],
      where: {
        id: waiterId
      },
      raw: true
    });
    let orders = [];
    if (!response[0] || !response[0].orders) {
      return orders;  // Если нет заказов, возвращаем пустой массив
    }
    for (let orderId of response[0].orders) {
      const order = await Order.findAll({
        attributes: ['id', 'isActive', 'items'],
        where: {
          id: orderId
        },
        raw: true
      });
      if (order[0]) {
        orders.push(order[0]);
      }
    }
    return orders;
  } catch (error) {
    throw error;
  }
}

async function closeOrder(orderId) {
  try {
    const result = await Order.update({ isActive: "false" }, { where: {id : orderId}});
    return result[0] > 0;
  } catch (error) {
    throw error;
  }
}


// orders.get("/orders", async (req, res) => {
//   try {
//     const orders = await getOrders();
//     res.send(orders);
//   } catch (error) {
//     console.error("Ошибка при загрузке заказов:", error);
//     res.status(500).send("Ошибка сервера");
//   }
// });
//
// orders.post("/orders", async (req, res) => {
//   try {
//     const body = req.body;
//     await createOrder(body);
//     res.send("Заказ добавлен.");
//   } catch (error) {
//     res.status(500).send("Ошибка сервера");
//   }
// });
//
// orders.put("/orders/:id", async (req, res) => {
//   try {
//     const body = req.body;
//     const orderId = req.params.id;
//     const updated = await updateOrder(orderId, body);
//     if (updated) {
//       res.send("Заказ обновлен.");
//     } else {
//       res.status(404).send("Заказ не найден.");
//     }
//   } catch (error) {
//     console.error("Ошибка при обновлении заказа:", error);
//     res.status(500).send("Ошибка сервера");
//   }
// })
//

//
// waiters.post("/waiters", async (req, res) => {
//   try {
//     const body = req.body;
//     await createUser(body);
//     res.send("Пользователь добавлен.");
//   } catch (error) {
//     console.log("При добавлении пользователя произошла ошибка:", error);
//     res.status(500).send("Ошибка сервера");
//   }
// });



//
// async function createOrder(order) {
//   try {
//     Order.create(order);
//   } catch (error) {
//     throw error;
//   }
// }
//
// async function updateOrder(orderId, data) {
//   try {
//     const result = await Order.update(data, {
//       where: {
//         id: orderId
//       }
//     });
//     return result[0] > 0;
//   } catch (error) {
//     throw error;
//   }
// }


//
// async function createUser(user) {
//   try {
//     User.create(user);
//   } catch (error) {
//     throw error;
//   }
// }
