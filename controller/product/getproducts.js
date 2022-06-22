const { Products, sequelize } = require("../../models");

async function getProduct(req, res) {
  try {
    const listProducts = await Products.findAll({
      where: { is_sold: false },
      order: sequelize.random(),
    });

    res.send(listProducts);
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProduct;
