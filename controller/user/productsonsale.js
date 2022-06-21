const { Products } = require("../../models");

const jwt = require("jsonwebtoken");

async function productsOnSale(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    let listProductsOnSale = await Products.findAll({
      where: { user_id: userData.id, is_sold: false },
    });

    if (listProductsOnSale) {
      if (!listProductsOnSale.length == 0) {
        res.status(200).send(listProductsOnSale);
      } else {
        res.send("Kamu belum memiliki barang yang dijual");
      }
    } else {
      res.send("errors");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = productsOnSale;
