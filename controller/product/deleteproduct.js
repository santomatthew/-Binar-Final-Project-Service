const { Products } = require("../../models");

async function deleteProduct(req, res) {
  try {
    const inputId = req.params.id;

    const checkProduct = await Products.findByPk(inputId);

    if (checkProduct) {
      await Products.destroy({ where: { id: inputId } });
      res.send(`Product dengan id ${inputId} berhasil di hapus`);
    } else {
      res.status(404).send("Produk tidak ditemukan");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = deleteProduct;
