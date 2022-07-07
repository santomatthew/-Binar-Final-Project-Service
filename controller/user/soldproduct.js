const { Products } = require("../../models");

async function soldProduct(req, res) {
  try {
    let userData = req.userData;

    const listProduct = await Products.findAll({
      where: { user_id: userData.id, is_sold: true },
    });

    if (listProduct.length > 0) {
      res.status(200).send(listProduct);
    } else {
      res.json({ message: "Produk anda belum ada yang terjual" });
    }
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

module.exports = soldProduct;
