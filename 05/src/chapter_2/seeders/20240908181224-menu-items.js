'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert('MenuItem', [
        {
          title: 'Margherita Pizza',
          picture: '',
          cost: 380,
          description: 'Classic Margherita pizza with fresh mozzarella and basil.'
        },
        {
          title: 'Vegan Salad',
          picture: '',
          cost: 250,
          description: 'Healthy vegan salad with a variety of fresh vegetables.'
        },
        {
          title: 'Spaghetti Carbonara',
          picture: '',
          cost: 450,
          description: 'Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper.'
        }
      ], {});
      console.log("Значения успешно добавлены в таблицу MenuItem.");
    } catch (error) {
      console.log("При добавлении значений по умолчанию в таблицу MenuItem произошла ошибка!", error);
    }
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MenuItem', null, {});
  }
};
