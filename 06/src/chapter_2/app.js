"use strict"

const express = require('express');
const app = express();
app.set("view engine", "hbs");
app.use(express.static('public'));
const { Order, User, MenuItem } = require('./models/index');
const db = require("./sequelize-database");


const main = express.Router();
const createOrder = express.Router();
const orderInfo = express.Router();
const menu = express.Router();
const signin = express.Router();
const signup = express.Router();
const activeOrders = express.Router();

var currentUser;

// завершить страницу регистрации
signup.get('/signup', async function(req, res) {
  try {
    res.render('signUp.hbs');
  } catch (error) {
    res.status(500).send(error);
  }
});

signup.post('/signup',async function (req, res) {
  try {
    const {name, login, password, repeatPassword} = req.body;
    let checkFields;
    let checkPass = password === repeatPassword;
    let user;
    let createdUser;
    if (name && login && password && repeatPassword) {
      checkFields = true;
      user = await User.findOne({where: {login: login}});
      if (!user) {
        if (checkPass && password !== 0) {
          createdUser = await User.create({name: name, login: login, password: password, role: 'waiter'});
        }
      }
    } else {
      checkFields = false;
    }
    res.render('signUp.hbs', {
      field: checkFields,
      user: user,
      password: checkPass,
      createdUser: createdUser
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

signin.get('/signin', async function (req, res) {
  try {
    res.render('signIn.hbs');
  } catch (error) {
    res.status(500).send(error);
  }
});

signin.post('/signin', async function(req, res) {
  try {
    let login = req.body.login;
    let password = req.body.password;
    currentUser = await User.findOne({where: {login: login}});
    if (currentUser) {
      let isWaiter = currentUser.role === 'waiter';
      let isValid = await currentUser.validPassword(password);
      if (isValid) {
        res.render('main.hbs', {validPassword: true, isWaiter: isWaiter});
      } else {
        res.render('main.hbs', {validPassword: false});
      }
    } else {
      console.log('Пользователь не найден!');
        throw('Пользователь не найден!');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

main.get('/', function(request, response) {
  try {
    response.redirect('/signin');
  } catch(error) {
    res.status(500).send(error);
  }
});

activeOrders.get("/active_orders", async (req, res) => {
  try {
    let activeOrders = await getActiveOrders();
    res.render('orders.hbs', {
      orders: activeOrders
    });
  } catch (error) {
    console.error("Ошибка при загрузке заказов:", error);
    res.status(500).send("Ошибка сервера");
  }
});

async function getActiveOrders() {
  try {
    const orders = await Order.findAll({
      where: { isActive: true }, // Только активные заказы
      include: [
        {
          model: User, // Включаем официанта
          attributes: ['name'] // Получаем только имя официанта
        },
        {
          model: MenuItem, // Включаем состав заказа
          attributes: ['title', 'cost'] // Получаем название и стоимость
        }
      ]
    });
    return orders;
  } catch (error) {
    console.error("Ошибка при получении активных заказов:", error);
    throw error;
  }
}

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

createOrder.get('/orders', async function (_, response) {
  try {
    const waiterName = currentUser.name;
    const menuData = (await MenuItem.findAll({attributes: ['title'], raw: true})) || [];
    response.render('createOrder.hbs', {
      waiter: waiterName,
      menu: menuData
    });
  } catch (error) {
    console.log(error);
    response.status(500).send("Ошибка сервера");
  }
});

createOrder.post('/orders', async function(request, response){
  try {
    const waiterId = currentUser.id;
    let menu;
    if (Array.isArray(request.body.menu)) {
     menu = request.body.menu;
    } else {
      menu = [];
      menu.push(request.body.menu);
    }
    let menuIds = [];
    let itemId;
    for (let item of menu) {
      itemId = await MenuItem.findAll({attributes: ['id'], where: {title: item}});
      menuIds.push(itemId.pop().id);
    }


    const newOrder = await Order.create({isActive: 'true', userId: waiterId});
    console.log(Object.keys(newOrder.__proto__));

    await newOrder.addMenuItems(menuIds);
    console.log('up');
    await newOrder.update({ items: menuIds });
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
app.use('/', signin);
app.use('/', signup);
app.use('/', activeOrders);


syncDB();

app.listen(3000, () => {
  console.log('Сервер слушает на порту 3000 :)');
});

async function syncDB() {
  try {
    await db.sync({ alter: true });
    // await db.sync({ force: true })
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
