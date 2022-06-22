const { Products, Photos, sequelize } = require("../../models");

async function getProduct(req, res) {
  try {
    const listProducts = await Products.findAll({
      where: { is_sold: false },
      order: sequelize.random(),
    });
    const listPhotos = await Photos.findAll();

    const products = [];

    for (let i in listProducts) {
      let data = {
        id: listProducts[i].id,
        name: listProducts[i].name,
        price: listProducts[i].price,
        category_id: listProducts[i].category_id,
        description: listProducts[i].description,
        user_id: listProducts[i].user_id,
        is_sold: listProducts[i].is_sold,
        photos: [],
      };
      for (let j in listPhotos) {
        if (listPhotos[j].product_id == listProducts[i].id) {
          data.photos.push(listPhotos[j].name);
        }
      }
      products.push(data);
    }
    res.send(products);
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProduct;
