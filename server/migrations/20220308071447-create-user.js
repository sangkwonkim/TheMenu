'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: { 
        type: Sequelize.STRING(40),
        allowNull : false,
        unique : true
      },
      nick: {
        type : Sequelize.STRING(15),
        allowNull : false,
      },
      password: {
        type : Sequelize.STRING(100),
        allowNull : true
      },
      social : {
        type : Sequelize.STRING(10),
        allowNull : false,
        defaultValue : 'local'
      },
      snsId : {
        type : Sequelize.STRING(30),
        allowNull : true
      },
      accessToken: {
        type : DataTypes.STRING(300),
        allowNull : true
      },
      refreshToken: {
        type : DataTypes.STRING(300),
        allowNull : true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};