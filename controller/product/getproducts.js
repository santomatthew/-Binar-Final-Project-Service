const {
  Products,
  Photos,
  Users,
  Categories,
  sequelize,
} = require("../../models");

async function getProduct(req, res) {
  try {
    const listProducts = await Products.findAll({
      where: { is_sold: false },
      order: sequelize.random(),
    });

    const products = [];

    for (let i in listProducts) {
      const ownerProduct = await Users.findByPk(listProducts[i].user_id);
      const category = await Categories.findByPk(listProducts[i].category_id);
      const photo = await Photos.findOne({
        where: { product_id: listProducts[i].id },
      });
      let data = {
        id: listProducts[i].id,
        name: listProducts[i].name,
        price: listProducts[i].price,
        category: category ? category.name : "Tidak ada kategori",
        description: listProducts[i].description,
        user_name: ownerProduct.name,
        is_sold: listProducts[i].is_sold,
        photo: photo.name,
      };
      // if (category) {
      //   data = {
      //     id: listProducts[i].id,
      //     name: listProducts[i].name,
      //     price: listProducts[i].price,
      //     category: category.name,
      //     description: listProducts[i].description,
      //     user_name: ownerProduct.name,
      //     is_sold: listProducts[i].is_sold,
      //     photo: photo.name,
      //   };
      // } else {
      //   data = {
      //     id: listProducts[i].id,
      //     name: listProducts[i].name,
      //     price: listProducts[i].price,
      //     category: "Tidak ada kategori",
      //     description: listProducts[i].description,
      //     user_name: ownerProduct.name,
      //     is_sold: listProducts[i].is_sold,
      //     photo: photo.name,
      //   };
      // }

      products.push(data);
    }
    res.send(products);
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProduct;
