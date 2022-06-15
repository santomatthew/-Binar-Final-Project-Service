'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Offers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Offers.init({
    product_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    bidder_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Offers',
    underscored: true,
  });
  return Offers;
};