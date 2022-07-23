const {
  Users,
  Offers,
  Products,
  Photos,
  Notifications,
} = require("../../models");

async function notification(req, res) {
  try {
    let userData = req.userData;

    let user = await Users.findByPk(userData.id);

    if (user) {
      let listNotification = [];

      let getNotification = await Notifications.findAll({
        where: {
          user_id: user.id,
        },
      });

      for (let i in getNotification) {
        const getProduct = await Products.findByPk(
          getNotification[i].product_id
        );
        const getPhoto = await Photos.findOne({
          where: { product_id: getProduct.id },
        });

        const getBid = await Offers.findOne({
          where: { id: getNotification[i].offer_id },
        });

        if (getBid) {
          if (getProduct.user_id == user.id) {
            let notificationData = {
              title: getNotification[i].title,
              name: getProduct.name,
              price: getProduct.price,
              bid_price: getBid.price,
              bidder_id: getBid.bidder_id,
              product_id: getProduct.id,
              is_sold: getProduct.is_sold,
              photo: getPhoto.name,
              date: getNotification[i].createdAt,
            };
            listNotification.push(notificationData);
          } else {
            const message = getNotification[i].message;

            if (message) {
              let notificationData = {
                title: getNotification[i].title,
                name: getProduct.name,
                price: getProduct.price,
                bid_price: getBid.price,
                bidder_id: getBid.bidder_id,
                product_id: getProduct.id,
                is_sold: getProduct.is_sold,
                photo: getPhoto.name,
                message: getNotification[i].message,
                date: getNotification[i].createdAt,
              };
              listNotification.push(notificationData);
            } else {
              let notificationData = {
                title: getNotification[i].title,
                name: getProduct.name,
                price: getProduct.price,
                bid_price: getBid.price,
                bidder_id: getBid.bidder_id,
                product_id: getProduct.id,
                is_sold: getProduct.is_sold,
                photo: getPhoto.name,
                date: getNotification[i].createdAt,
              };
              listNotification.push(notificationData);
            }
          }
        } else {
          let notificationData = {
            title: getNotification[i].title,
            name: getProduct.name,
            price: getProduct.price,
            photo: getPhoto.name,
            product_id: getProduct.id,
            is_sold: getProduct.is_sold,
            date: getNotification[i].createdAt,
          };
          listNotification.push(notificationData);
        }
      }

      if (listNotification.length > 0) {
        res.status(200).json({
          notifications: listNotification.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
          }),
        });
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
