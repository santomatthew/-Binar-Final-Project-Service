const { Offers, Notifications, Products, Users } = require("../../models");
const jwt = require("jsonwebtoken");

async function finishOffer(req, res) {
  try {
    let userData = req.userData;

    let option = req.body.value;
    const offer = req.params.id;
    let finalOffer = await Offers.findByPk(offer);

    if (option == 1) {
      let product = await Products.findByPk(finalOffer.product_id);
      if (
        product.user_id == userData.id &&
        finalOffer.status == true &&
        product.is_sold == false
      ) {
        let soldProduct = await Products.update(
          { is_sold: true },
          {
            where: {
              id: product.id,
            },
          }
        );

        await Notifications.create({
          user_id: userData.id,
          product_id: soldProduct.id,
          title: "Berhasil terjual",
        });

        res.json({
          message: "Produk berhasil terjual",
        });
      } else {
        res.status(401).json({
          message: "Forbidden",
        });
      }
    } else {
      let product = await Products.findByPk(finalOffer.product_id);
      let bidder = await Users.findByPk(finalOffer.bidder_id);
      await Offers.destroy({ where: { id: finalOffer.id } });
      let offers = await Offers.findAll({
        where: { product_id: product.id },
        status: false,
      });

      if (offers) {
        for (let i in offers) {
          await Offers.update(
            { status: null },
            { where: { id: offers[i].id } }
          );
        }
      }

      res.json({
        message: `Transaksi dengan ${bidder.name} telah dibatalkan`,
      });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = finishOffer;
