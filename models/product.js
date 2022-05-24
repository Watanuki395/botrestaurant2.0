'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
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

  // id_prd, name_prd, description_prd, id_cat, id_user
    Product.init({
    id_prd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name_prd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description_prd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_cat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imgURL_prd: {
        type: DataTypes.STRING,
        allowNull: true
    },
    price_prd: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    isOnMenu: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    }
    }, {
        sequelize,
        modelName: 'Product',
        tableName: 'products_tb',
    });
    return Product;
    };