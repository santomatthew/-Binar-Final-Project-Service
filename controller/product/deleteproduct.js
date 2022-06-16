const { Products } = require("../../models");

async function deleteProduct(req, res) {
  const id = req.params.id;

  try {
    await Products.destroy({ where: { id } })

    if (Products) {
      res.send(Products);
    } else {
      res.status(404).send("Produk tidak ditemukan");
    }
  } catch (error) {
    res.send(error);
  }

}

module.exports = deleteProduct;