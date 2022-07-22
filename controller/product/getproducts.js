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
    let search = req.query.name;
    console.log(search);

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
        photo: photo ? photo.name : "",
      };
      products.push(data);
    }

    if (search) {
      let filterByQuery = [];
      for (let i in products) {
        if (products[i].name.toLowerCase().match(search.toLowerCase())) {
          filterByQuery.push(products[i]);
        }
      }
      res.status(200).json({ products: filterByQuery });
    } else {
      res.status(200).json({ products: products });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
}

module.exports = getProduct;
