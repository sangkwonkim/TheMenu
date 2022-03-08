'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Atemenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Atemenu.belongsTo(models.User, { foreignKey: 'user', targetKey: 'id' });
      Atemenu.belongsTo(models.Menu, { foreignKey: 'menu', targetKey: 'id' });
    }
  }
  Atemenu.init({
    user: {
      type : DataTypes.INTEGER,
      allowNull : false,
    },
    menu: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps : false,
    modelName: 'Atemenu',
  });
  return Atemenu;
};