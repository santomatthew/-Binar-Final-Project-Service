const { Products } = require("../../models");

async function getProduct(req, res) {
  try {
    const listProducts = await Products.findAll({ where: { is_sold: false } });

    res.send(listProducts);
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProduct;
