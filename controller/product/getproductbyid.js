const { Products } = require("../../models");

async function getProductById(req, res) {
  try {
    const inputId = req.params.id;

    const product = await Products.findByPk(inputId);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send("Produk tidak ditemukan");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProductById;
