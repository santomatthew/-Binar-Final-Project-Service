const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function soldProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

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
