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
      const photo = await Photos.findByPk(ownerProduct.photo_id);
      let data = {
        id: product.id,
        name: product.name,
        price: product.price,
        category: category ? category.name : "Tidak ada kategori",
        description: product.description,
        user_name: ownerProduct.name,
        city: ownerProduct.city,
        owner_photo: photo ? photo.name : null,
        user_id: ownerProduct.id,

        is_sold: product.is_sold,

        photos: [],
      };

      const listPhotos = await Photos.findAll({
        where: { product_id: data.id },
      });
      for (let j in listPhotos) {
        data.photos.push(listPhotos[j].name);
      }
      res.status(200).json({ product: data });
    } else {
      throw new Error("Produk tidak ditemukan");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

module.exports = getProductById;
