const { Products, Categories, Photos } = require("../../models");

async function productsOnSale(req, res) {
  try {
    let userData = req.userData;

    let listProductsOnSale = await Products.findAll({
      where: { user_id: userData.id, is_sold: false },
    });

    let listProducts = [];

    if (listProductsOnSale) {
      if (!listProductsOnSale.length == 0) {
        for (let i in listProductsOnSale) {
          const category = await Categories.findByPk(
            listProductsOnSale[i].category_id
          );
          const photo = await Photos.findOne({
            where: { product_id: listProductsOnSale[i].id },
          });
          let data = {
            id: listProductsOnSale[i].id,
            name: listProductsOnSale[i].name,
            price: listProductsOnSale[i].price,
            category: category ? category.name : "Tidak ada kategori",
            description: listProductsOnSale[i].description,
            is_sold: listProductsOnSale[i].is_sold,
            photo: photo ? photo.name : "",
          };
          listProducts.push(data);
        }
        res.status(200).json({ products: listProducts });
      } else {
        res.send("Kamu belum memiliki barang yang dijual");
      }
    } else {
      res.send("errors");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = productsOnSale;
