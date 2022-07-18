const { Products, Notifications } = require("../../models");

async function putProduct(req, res) {
  try {
    let userData = req.userData;
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
          await Notifications.create({
            user_id: userData.id,
            product_id: inputId,
            title: "Berhasil di update",
          });
          res.status(200).json({ message: `Update product berhasil` });
        } else {
          res.json({ message: "Update product gagal" });
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
    res.json({ message: error.message });
  }
}
module.exports = putProduct;
