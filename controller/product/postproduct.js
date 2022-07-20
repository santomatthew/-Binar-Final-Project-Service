const { Products, Photos, Notifications } = require("../../models");

async function postProduct(req, res) {
  try {
    let userData = req.userData;

    const inputData = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category,
      description: req.body.description,
      user_id: userData.id,
    };
    const inputPhoto = req.body.photo;
    if (
      !inputData.name ||
      !inputData.price ||
      !inputData.category_id ||
      !inputData.description ||
      !inputPhoto
    ) {
      throw new Error("Tidak boleh ada data yang kosong");
    }

    const newProduct = await Products.create(inputData);

    await Notifications.create({
      user_id: userData.id,
      product_id: newProduct.id,
      title: "Berhasil di terbitkan",
    });
    for (let i in inputPhoto) {
      await Photos.create({
        name: inputPhoto[i],
        product_id: newProduct.id,
      });
    }

    res
      .status(201)
      .json({ message: `Product ${inputData.name} berhasil dibuat` });
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = postProduct;
