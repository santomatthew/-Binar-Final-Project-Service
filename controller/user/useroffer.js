const {
  Users,
  Offers,
  Products,
  Photos,
  Notifications,
} = require("../../models");

async function userOffer(req, res) {
  try {
    let userData = req.userData;

    let bidder_id = req.params.id;
    if (bidder_id == userData.id) {
      throw new Error("Tidak bisa melihat penawaran diri sendiri");
    }

    let findOffers = await Offers.findAll({ where: { bidder_id: bidder_id } });

    let bidderData = await Users.findOne({ where: { id: bidder_id } });
    let bidderPhoto = await Photos.findByPk(bidderData.photo_id);

    let listOffered = [];

    let bidder = {
      name: bidderData.name,
      city: bidderData.city,
      photo: bidderPhoto ? bidderPhoto.name : null,
    };

    for (let i in findOffers) {
      const findProduct = await Products.findOne({
        where: { id: findOffers[i].product_id, user_id: userData.id },
      });

      if (findProduct) {
        const notification = await Notifications.findOne({
          where: { user_id: userData.id },
          product_id: findProduct.id,
          offer_id: findOffers[i].id,
        });
        const productPhoto = await Photos.findOne({
          where: { product_id: findProduct.id },
        });

        listOffered.push({
          id: findOffers[i].id,
          title: notification.title,
          name: findProduct.name,
          price: findProduct.price,
          bid_price: findOffers[i].price,
          photo: productPhoto.name,
          date: findOffers[i].createdAt,
        });
      }
    }

    if (listOffered.length > 0) {
      res.status(200).json({ bidder_data: bidder, products: listOffered });
    } else {
      res.status(200).json({ message: "Penawaran user ini tidak ada" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = userOffer;
