const { Products, Photos, Notifications } = require("../../models");
const jwt = require("jsonwebtoken");

async function postProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    const inputData = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category,
      description: req.body.description,
      user_id: userData.id,
    };

    const inputPhoto = req.body.photo;

    const newProduct = await Products.create(inputData);

    if (newProduct) {
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
    } else {
      res.status(424).json({ message: `Product tidak berhasil dibuat` });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = postProduct;
