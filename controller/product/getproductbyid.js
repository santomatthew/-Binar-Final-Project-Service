const { Products, Photos } = require("../../models");

async function getProductById(req, res) {
  try {
    const inputId = req.params.id;

    const product = await Products.findByPk(inputId, {
      where: { is_sold: false },
    });

    if (product) {
      let data = {
        id: product.id,
        name: product.name,
        price: product.price,
        category_id: product.category_id,
        description: product.description,
        user_id: product.user_id,
        is_sold: product.is_sold,
        photos: [],
      };

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
