'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      // BusinessService.belongsTo(models.User, {
      //   foreignKey: 'id_user'              
      // });
      // BusinessService.belongsTo(models.Service, {
      //   foreignKey: 'id_service'              
      // });
    }
    };

  // id_cat, name_cat, description_cat
  Categories.init({
    id_cat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name_cat: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description_cat: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        sequelize,
        modelName: 'Categories',
        tableName: 'product_categories_tb',
    });
    return Categories;
    };