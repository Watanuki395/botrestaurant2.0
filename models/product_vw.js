'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class ProductVw extends Model {
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
  ProductVw.init({
    id_user: DataTypes.INTEGER,
    id_prd: {type:DataTypes.INTEGER, primaryKey:true, allowNull:false},
    id_cat: DataTypes.INTEGER,
    producto: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    categoria: DataTypes.STRING,
    uuid: DataTypes.UUID
    }, {
        sequelize,
        modelName: 'ProductVw',
        tableName: 'product_vw',
    });
    return ProductVw;
    };