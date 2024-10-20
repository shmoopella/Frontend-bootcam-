'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('User', [
        {
          name: 'Alice Johnson',
          role: 'admin'
        },
        {
          name: 'Bob Smith',
          role: 'waiter'
        },
        {
          name: 'Carol White',
          role: 'waiter'
        },
        {
          name: 'Emily Smoop',
          role: 'boss',
        }
      ], {});
      console.log("Значения успешно добавлены в таблицу User.");
    } catch (error) {
      console.log("При добавлении значений по умолчанию в таблицу User произошла ошибка!", error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  }
};
