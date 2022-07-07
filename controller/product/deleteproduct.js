const { Products } = require("../../models");
async function deleteProduct(req, res) {
  try {
    let userData = req.userData;
    const inputId = req.params.id;
    const checkProduct = await Products.findByPk(inputId);

    if (checkProduct) {
      if (checkProduct.user_id == userData.id) {
        await Products.destroy({ where: { id: inputId } });
        res.json({ message: `Product dengan id ${inputId} berhasil di hapus` });
      } else {
        res.status(403).json({
          message: "Anda tidak bisa menghapus product yang bukan milik anda",
        });
      }
    } else {
      res.status(404).json({ message: "Produk tidak ditemukan" });
    }
  } catch (error) {
    res.send(error);
    return;
  }
}

module.exports = deleteProduct;
