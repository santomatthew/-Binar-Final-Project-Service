const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function putProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");
    const inputId = req.params.id;

    const product = await Products.findByPk(inputId);

    if (product.user_id == userData.id) {
      if (product) {
        let productData = {
          name: product.name,
          price: product.price,
          description: product.description,
          category_id: product.category_id,
        };
        productData = Object.assign(productData, req.body);

        const updateProduct = await Products.update(productData, {
          where: { id: inputId },
        });

        if (updateProduct) {
          res.json({ message: `Update product ${req.params.id} berhasil` });
        } else {
          res.json({ message: "update product gagal" });
        }
      } else {
        res.json({ message: "Produk yang ingin di update tidak ada" });
      }
    } else {
      res.status(403).json({
        message: "Anda tidak bisa mengupdate product yang bukan milik anda",
      });
    }
  } catch (error) {
    res.send(error);
  }
}
module.exports = putProduct;
