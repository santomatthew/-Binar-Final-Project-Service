const { Offers, Users, Products, Sequelize } = require("../../models");
const jwt = require("jsonwebtoken");
const Op = Sequelize.Op;

async function updateOffer(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    let chosenOffer = req.params.id;
    let offer = await Offers.findByPk(chosenOffer);

    if (offer) {
      let product = await Products.findByPk(offer.product_id);

      if (product.user_id == userData.id) {
        let notElectedOffers = await Offers.findAll({
          where: {
            id: {
              [Op.not]: chosenOffer,
            },
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

        const bidder = await Users.findByPk(chosenOffer.bidder_id);

        res.json({
          message: `Berhasil mengambil tawaran dari ${bidder.name}`,
        });
      }
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = updateOffer;
