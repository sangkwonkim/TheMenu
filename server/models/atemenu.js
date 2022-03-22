'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AteMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      AteMenu.belongsTo(models.User, { foreignKey: 'user', targetKey: 'id' });
      AteMenu.belongsTo(models.Menu, { foreignKey: 'menu', targetKey: 'id' });
    }
  }
  AteMenu.init({
    user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    menu: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'AteMenu'
  });
  return AteMenu;
};
