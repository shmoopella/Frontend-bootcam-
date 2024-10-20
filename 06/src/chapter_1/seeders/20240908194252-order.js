'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('Order', [
        {
          isActive: 'true',
          items: [1, 2, 3]
        },
        {
          isActive: 'true',
          items: [1, 2]
        },
        {
          isActive: 'true',
          items: [1, 3]
        },
        {
          isActive: 'false',
          items: [1, 2]
        }
      ], {});
      console.log("Значения успешно добавлены в таблицу Order.");
    } catch (error) {
      console.log("При добавлении значений по умолчанию в таблицу Order произошла ошибка!", error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Order', null, {});
  }
};
