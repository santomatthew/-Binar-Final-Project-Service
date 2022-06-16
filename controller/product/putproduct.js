const { Products } = require("../../models");

async function putProduct(req, res) {
  try {
    const inputId = req.params.id;
    const inputName = req.body.name;
    const inputPrice = req.body.price;
    const inputDescription = req.body.description;
    const inputPhoto = req.body.photo;
    const inputCategory = req.body.category;

    const product = await Products.findByPk(inputId);

    if (product) {
      const updateProduct = await Products.update(
        {
          name: inputName,
          price: inputPrice,
          category_id: inputCategory,
          description: inputDescription,
          photo: inputPhoto,
        },
        { where: { id: inputId } }
      );

      if (updateProduct) {
        res.send(`update product ${req.params.id} berhasil`);
      } else {
        res.send("update product gagal");
      }
    } else {
      res.send("Produk yang ingin di update tidak ada");
    }
  } catch (error) {
    res.send(error);
  }
}
module.exports = putProduct;
