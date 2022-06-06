'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({models}) {
      // define association here
    // User.hasMany(models.Service, {
    //     through: models.BusinessService,
    //     foreignKey: 'id_service'   
    // });
    }

    toJSON() {
        return { ...this.get(), password:undefined, refreshToken: undefined}
    }

};
User.init({
    uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'El usuario debe de tener un nombre' },
            notEmpty: { msg: 'El nombre no puede estar vacio' },
        },
    },
    business_nm: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Tu negocio debe de tener un nombre' },
            notEmpty: { msg: 'El nombre de tu negocio no puede estar vacio' },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Tu negocio debe de tener una direccion de correo electronico' },
            notEmpty: { msg: 'El correo electronico no puede estar vacio' },
            isEmail: { msg: 'debes usar una direcion de correo valida' },
        },
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Para registrarte nececitas una contraseña' },
            notEmpty: { msg: 'La contraseña no puede estar vacio y debe de ser al menos 6 caracteres' },
            len: [6]
        },
    },
    admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        defaultValue: false
    }
},
    {
        sequelize,
        tableName: 'users',
        modelName: 'User',
    });
return User;
};