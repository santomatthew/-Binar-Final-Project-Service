const { Products } = require("../../models");

async function getProductById(req, res) {
  try {
    const inputId = req.params.id;

    const product = await Products.findByPk(inputId, {
      where: { is_sold: false },
    });

    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProductById;
