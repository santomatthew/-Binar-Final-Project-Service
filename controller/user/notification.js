const {
  Users,
  Offers,
  Products,
  Photos,
  Notifications,
} = require("../../models");
const jwt = require("jsonwebtoken");

async function notification(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    let user = await Users.findByPk(userData.id);

    if (user) {
      let listNotification = [];

      let getNotification = await Notifications.findAll({
        where: {
          user_id: user.id,
        },
      });

      for (let i in getNotification) {
        let getProduct = await Products.findByPk(getNotification[i].product_id);
        let getBidPrice = await Offers.findOne({
          where: {
            product_id: getNotification[i].product_id,
            bidder_id: getNotification[i].user_id,
          },
        });
        let getPhoto = await Photos.findOne({
          where: { product_id: getNotification[i].product_id },
        });

        if (getBidPrice) {
          let notificationData = {
            title: getNotification[i].title,
            name: getProduct.name,
            price: getProduct.price,
            bid_price: getBidPrice.price,
            photo: getPhoto.name,
            date: getNotification[i].createdAt,
          };
          listNotification.push(notificationData);
        } else {
          let notificationData = {
            title: getNotification[i].title,
            name: getProduct.name,
            price: getProduct.price,
            photo: getPhoto.name,
            date: getNotification[i].createdAt,
          };
          listNotification.push(notificationData);
        }
      }

      if (listNotification.length > 0) {
        res.send(listNotification);
      } else {
        res.json({ message: "Anda tidak memiliki notifikasi" });
      }
    } else {
      res.json({ message: "Bugs" });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = notification;
