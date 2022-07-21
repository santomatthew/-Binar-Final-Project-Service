const { Products, Offers, Users, Sequelize, Photos } = require("../../models");

const Op = Sequelize.Op;

async function offeredProduct(req, res) {
  try {
    let userData = req.userData;

    // List barang yang dijual
    let listProductOnSale = await Products.findAll({
      where: { user_id: userData.id, is_sold: false },
    });

    // array yang akan digunakan untuk mensortir barang yang telah ditawar
    let listInterestedProducts = [];

    let listOffers = await Offers.findAll({
      where: {
        status: {
          [Op.or]: [null, false],
        },
      },
    });

    for (let i in listProductOnSale) {
      for (let j in listOffers) {
        if (listOffers[j].product_id == listProductOnSale[i].id) {
          const bidder = await Users.findByPk(listOffers[j].bidder_id);
          const photo = await Photos.findOne({
            where: { product_id: listProductOnSale[i].id },
          });

          listInterestedProducts.push({
            id: listOffers[j].id,
            product_name: listProductOnSale[i].name,
            bidder: bidder.name,
            photo: photo ? photo.name : null,
            price: listProductOnSale[i].price,
            offer_price: listOffers[j].price,
          });
        }
      }
    }

    if (listInterestedProducts.length > 0) {
      res.json({ products: listInterestedProducts });
    } else {
      res.json({ message: "Produk anda belum ada yang minat" });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = offeredProduct;
