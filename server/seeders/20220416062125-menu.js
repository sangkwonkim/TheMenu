'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Menus', [{
      name: '김치찌개',
      spicy: true,
      meat: true,
      soup: true,
      style: 'korean',
      type: 'rice'
    }, {
      name: '된장찌개',
      spicy: false,
      meat: false,
      soup: true,
      style: 'korean',
      type: 'rice'
    }, {
      name: '초밥',
      spicy: false,
      meat: false,
      soup: false,
      style: 'japanese',
      type: 'rice'
    }, {
      name: '짜장면',
      spicy: false,
      meat: false,
      soup: false,
      style: 'chinese',
      type: 'noodle'
    }, {
      name: '짬뽕',
      spicy: true,
      meat: false,
      soup: true,
      style: 'chinese',
      type: 'noodle'
    }])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Menus', null, {});
  }
};
