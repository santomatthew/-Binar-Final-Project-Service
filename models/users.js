'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    photo_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Users',
    underscored: true,
  });
  return Users;
};