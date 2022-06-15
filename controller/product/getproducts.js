const { Products } = require("../../models");

async function getProduct(req, res) {
  try {
    const listProducts = await Products.findAll();

    res.send(listProducts);
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProduct;
