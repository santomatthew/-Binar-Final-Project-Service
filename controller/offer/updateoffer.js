const {
  Offers,
  Users,
  Products,
  Notifications,
  Sequelize,
} = require("../../models");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;

async function acceptOffer(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    let chosenOffer = req.params.id;
    let option = req.body.value;
    let offer = await Offers.findByPk(chosenOffer);

    if (offer) {
      let product = await Products.findByPk(offer.product_id);
      if (option == 1) {
        if (product.user_id == userData.id) {
          let notElectedOffers = await Offers.findAll({
            where: {
              id: {
                [Op.not]: chosenOffer,
              },
              product_id: product.id,
            },
          });

          await Offers.update(
            { status: true },
            {
              where: {
                id: chosenOffer,
              },
            }
          );

          await Notifications.create({
            title: "Penawaran Produk",
            user_id: offer.bidder_id,
            product_id: product.id,
            offer_id: offer.id,
            message: "Kamu akan segera dihubungi penjual via whatsapp",
          });

          for (let i in notElectedOffers) {
            await Offers.update(
              { status: false },
              {
                where: {
                  id: notElectedOffers[i].id,
                },
              }
            );
          }

          const bidder = await Users.findByPk(offer.bidder_id);

          res.json({
            message: `Berhasil mengambil tawaran dari ${bidder.name}`,
          });
        }
      } else {
        if (product.user_id == userData.id) {
          await Offers.destroy({ where: { id: offer.id } });
          res.json({
            message: "Penawaran berhasil di tolak",
          });
        } else {
          res.status(401).json({
            message: "Forbidden",
          });
        }
      }
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = acceptOffer;
