'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      email: 'sangkwon2406@naver.com',
      password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
      nick: 'sangkwon',
      social: 'local',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'test@naver.com',
      password: '$2b$10$RJq0gXxBHhLsRhMtI8U3p./kk.KPvdohoMx179N3HvbUaDpPbMi1.',
      nick: 'test',
      social: 'local',
      accessToken: null,
      refreshToken: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
