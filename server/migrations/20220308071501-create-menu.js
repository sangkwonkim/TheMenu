'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name : {
        type : Sequelize.STRING(30),
        allowNull : false,
        unique : true
      },
      spicy: { // 안 매우면 0, 매우면 1
        type : Sequelize.BOOLEAN,
        allowNull : false,
      },
      meat: { // 고기 없거나 비주류면 0, 고기가 주류면 1
        type : Sequelize.BOOLEAN,
        allowNull : false,
      },
      soup: { // 국물 없으면 0, 국물 있으면 1
        type : Sequelize.BOOLEAN,
        allowNull : false,
      },
      style: { // korean, japanese, chinese, western, others(분식 등)
        type : Sequelize.STRING(10),
        allowNull : false,
      },
      type : { // rice, noodle, bread, others(샐러드)
        type : Sequelize.STRING(10),
        allowNull : false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Menus');
  }
};