const { Products, Users, Categories, Photos } = require("../../models");

async function getProductById(req, res) {
  try {
    const inputId = req.params.id;

    const product = await Products.findByPk(inputId, {
      where: { is_sold: false },
    });

    if (product) {
      const ownerProduct = await Users.findByPk(product.user_id);
      const category = await Categories.findByPk(product.category_id);
      let data = {};
      if (category) {
        data = {
          id: product.id,
          name: product.name,
          price: product.price,
          category: category.name,
          description: product.description,
          user_name: ownerProduct.name,
          is_sold: product.is_sold,
          photos: [],
        };
      } else {
        data = {
          id: product.id,
          name: product.name,
          price: product.price,
          category: "Tidak ada kategori",
          description: product.description,
          user_name: ownerProduct.name,
          is_sold: product.is_sold,
          photos: [],
        };
      }

      const listPhotos = await Photos.findAll({
        where: { product_id: data.id },
      });
      for (let j in listPhotos) {
        data.photos.push(listPhotos[j].name);
      }
      res.send(data);
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = getProductById;
