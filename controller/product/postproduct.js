const { Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function postProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");
    const inputName = req.body.name;
    const inputPrice = req.body.price;
    const inputCategory = req.body.category;
    const inputDescription = req.body.description;
    const inputPhoto = req.body.photo;

    const newProduct = await Products.create({
      name: inputName,
      price: inputPrice,
      category_id: inputCategory,
      description: inputDescription,
      photo: inputPhoto,
      user_id: userData.id,
    });

    if (newProduct) {
      res.status(201).send(`Product ${inputName} berhasil dibuat`);
    } else {
      res.status(424).send(`Product tidak berhasil dibuat`);
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = postProduct;
