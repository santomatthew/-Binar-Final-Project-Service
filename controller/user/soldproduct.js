const { Products, Photos } = require("../../models");

async function soldProduct(req, res) {
  try {
    let userData = req.userData;

    const listProduct = await Products.findAll({
      where: { user_id: userData.id, is_sold: true },
    });

    if (listProduct.length > 0) {
      let products = [];
      for (let i in listProduct) {
        const photo = await Photos.findOne({
          where: { product_id: listProduct[i].id },
        });

        products.push({
          id: listProduct[i].id,
          name: listProduct[i].name,
          price: listProduct[i].price,
          photo: photo ? photo.name : "",
        });
      }

      res.status(200).json({ products: products });
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
