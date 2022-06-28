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
          title: "Berhasil di terbitkan",
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
              title: "Penawaran Produk",
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

      let offeredProducts = await Offers.findAll({
        where: { bidder_id: user.id },
      });

      if (offeredProducts) {
        for (let k in offeredProducts) {
          let product = await Products.findByPk(offeredProducts[k].product_id);
          let photo = await Photos.findOne({
            where: { product_id: product.id },
          });
          let data = {
            title: "Penawaran Produk",
            name: product.name,
            price: product.price,
            bid_price: offeredProducts[k].price,
            photo: photo.name,
            date: offeredProducts[k].createdAt,
            message: "Kamu akan segera dihubungi penjual via whatsapp",
          };

          listNotifications.push(data);
        }
      }

      res.send(
        listNotifications.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        })
      );
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
