'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Atemenu, { foreignKey: 'user', sourceKey: 'id' });
    }
  }
  User.init({
    email: { 
      type : DataTypes.STRING(40),
      allowNull : false,
      unique : true
    },
    nick: {
      type : DataTypes.STRING(15),
      allowNull : false,
    },
    password: {
      type : DataTypes.STRING(100),
      allowNull : true
    },
    social : {
      type : DataTypes.STRING(10),
      allowNull : false,
      defaultValue : 'local'
    },
    snsId : {
      type : DataTypes.STRING(30),
      allowNull : true
    },
    accessToken: {
      type : DataTypes.STRING(300),
      allowNull : true
    },
    refreshToken: {
      type : DataTypes.STRING(300),
      allowNull : true
    }
  }, {
    sequelize,
    timestamps : true,
    paranoid : true,
    charset : 'utf8',
    collate : 'utf8_general_ci',
    modelName: 'User',
  });
  return User;
};