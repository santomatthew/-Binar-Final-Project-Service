const { Users, Offers, Products, Photos } = require("../../models");
const jwt = require("jsonwebtoken");

async function notification(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    let user = await Users.findByPk(userData.id);

    if (user) {
      let listProducts = await Products.findAll({
        where: { user_id: user.id, is_sold: false },
      });

      let products = listProducts.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      let listNotifications = [];
      for (let i in products) {
        let photo = await Photos.findOne({
          where: { product_id: products[i].id },
        });
        let productData = {
          message: "Berhasil di terbitkan",
          name: products[i].name,
          price: products[i].price,
          date: products[i].createdAt,
          photo: photo.name,
        };
        listNotifications.push(productData);
        let listOffers = await Offers.findAll({
          where: { product_id: products[i].id },
        });

        let offers = listOffers.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        for (let j in offers) {
          if (offers[j].product_id == products[i].id) {
            let offerData = {
              message: "Penawaran Produk",
              name: products[i].name,
              price: products[i].price,
              bid_price: offers[j].price,
              photo: photo.name,
              date: offers[j].createdAt,
            };
            listNotifications.push(offerData);
          }
        }
      }

      res.send(listNotifications);
    } else {
      res.json({
        message: "Bugs",
      });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = notification;
