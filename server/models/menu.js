'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Menu.hasMany(models.Atemenu, { foreignKey: 'menu', sourceKey: 'id' });
    }
  }
  Menu.init({
    name : {
      type : DataTypes.STRING(30),
      allowNull : false,
      unique : true
    },
    spicy: { // 안 매우면 0, 매우면 1
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    meat: { // 고기 없거나 비주류면 0, 고기가 주류면 1
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    soup: { // 국물 없으면 0, 국물 있으면 1
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    style: { // 한식, 일식, 중식, 양식, 기타(분식 등)
      type : DataTypes.STRING(10),
      allowNull : false
    },
    type : { // 밥, 면, 빵, 기타(샐러드)
      type : DataTypes.STRING(10),
      allowNull : false
    }
  }, {
    sequelize,
    timestamps : false,
    modelName: 'Menu',
  });
  return Menu;
};