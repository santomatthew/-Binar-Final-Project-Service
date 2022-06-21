const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function putProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");
    const inputId = req.params.id;
    const inputName = req.body.name;
    const inputPrice = req.body.price;
    const inputDescription = req.body.description;
    const inputPhoto = req.body.photo;
    const inputCategory = req.body.category;

    const product = await Products.findByPk(inputId);

    if (product.user_id == userData.id) {
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
          res.json({ message: `Update product ${req.params.id} berhasil` });
        } else {
          res.json({ message: "update product gagal" });
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
    res.send(error);
  }
}
module.exports = putProduct;
