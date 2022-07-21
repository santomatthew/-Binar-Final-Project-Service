const e = require("cors");
const { Offers, Products } = require("../../models");

async function checkOffer(req, res) {
  try {
    let userData = req.userData;

    let inputProductId = req.params.id;

    let checkOffer = await Offers.findOne({
      where: { product_id: inputProductId, bidder_id: userData.id },
    });

    let product = await Products.findOne({
      where: { id: inputProductId, is_sold: false },
    });

    if (product) {
      if (product.user_id == userData.id) {
        res.json({
          message: "Anda tidak bisa mengecek penawaran anda pada produk anda",
        });
      } else {
        if (checkOffer) {
          res.json({ is_offered: true });
        } else {
          res.json({ is_offered: false });
        }
      }
    } else {
      res.json({ message: "Produk tidak ada" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = checkOffer;
