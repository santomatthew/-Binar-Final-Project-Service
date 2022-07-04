const { Products } = require("../../models");
const { Offers } = require("../../models");
const { Users } = require("../../models");

const jwt = require("jsonwebtoken");

async function offeredProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    // List barang yang dijual
    let listProductOnSale = await Products.findAll({
      where: { user_id: userData.id },
    });

    // array yang akan digunakan untuk mensortir barang yang telah ditawar
    let listInterestedProducts = [];

    let listOffers = await Offers.findAll();

    for (let i in listProductOnSale) {
      for (let j in listOffers) {
        if (listOffers[j].product_id == listProductOnSale[i].id) {
          const bidder = await Users.findByPk(listOffers[j].bidder_id);

          listInterestedProducts.push({
            id: listOffers[j].id,
            bidder: bidder.name,
            price: listProductOnSale[i].price,
            offer_price: listOffers[j].price,
          });
        }
      }
    }

    if (listInterestedProducts.length > 0) {
      res.send(listInterestedProducts);
    } else {
      res.send("Produk anda belum ada yang minat");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = offeredProduct;
