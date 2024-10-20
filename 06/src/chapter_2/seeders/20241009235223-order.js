'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const ordersId = await queryInterface.bulkInsert('Order', [
        {isActive: 'true', items: [1, 2, 3], userId: 3},
        {isActive: 'true', items: [1, 2], userId: 2},
        {isActive: 'true', items: [1, 3], userId: 2}
      ], { returning: ['id'] });
      const itemsId = await queryInterface.bulkInsert('MenuItem', [
        {title: 'Margherita Pizza', picture: '/images/Margherita.png', cost: 380, description: 'Classic Margherita pizza with fresh mozzarella and basil.'},
        {title: 'Vegan Salad', picture: '/images/VeganSalad.png', cost: 250, description: 'Healthy vegan salad with a variety of fresh vegetables.'},
        {title: 'Spaghetti Carbonara', picture: '/images/Carbonara.png', cost: 450, description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.'}
      ], {returning: ['id']});

      const orderMenuItems = await queryInterface.bulkInsert('OrderMenuItems', [
        {orderId: ordersId[0].id, menuItemId: itemsId[0].id},
        {orderId: ordersId[0].id, menuItemId: itemsId[1].id},
        {orderId: ordersId[0].id, menuItemId: itemsId[2].id},
        {orderId: ordersId[1].id, menuItemId: itemsId[0].id},
        {orderId: ordersId[1].id, menuItemId: itemsId[1].id},
        {orderId: ordersId[2].id, menuItemId: itemsId[0].id},
        { orderId: ordersId[2].id, menuItemId: itemsId[2].id}
      ],{});
      console.log('Значения успешно добавлены в таблицы Order, MenuItem и OrderMenuItems');
    } catch (error) {
      console.log("При добавлении значений по умолчанию в таблицу Order произошла ошибка!", error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderMenuItems', null, {});
    await queryInterface.bulkDelete('Order', null, {});
    await queryInterface.bulkDelete('MenuItem', null, {});
  }
};
