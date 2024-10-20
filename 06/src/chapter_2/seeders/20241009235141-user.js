'use strict';

const bcrypt = require('bcrypt'); // Импортируем bcrypt для хэширования паролей

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const salt = await bcrypt.genSalt(10);
      const users = [
        {
          name: 'Emily Shmoop',
          login: 'shmoopella',
          password: await bcrypt.hash('cAt50898!', salt),
          role: 'admin'
        },
        {
          name: 'Bob Smith',
          login: 'bob',
          password: await bcrypt.hash('1234', salt),
          orders: [2, 3],
          role: 'waiter'
        },
        {
          name: 'Carol White',
          login: 'carry',
          password: await bcrypt.hash('1234', salt),
          orders: [1, 4],
          role: 'waiter'
        }
      ];
      await queryInterface.bulkInsert('User', users, {});
      console.log("Значения успешно добавлены в таблицу User.");
    } catch (error) {
      console.log("При добавлении значений по умолчанию в таблицу User произошла ошибка!", error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
