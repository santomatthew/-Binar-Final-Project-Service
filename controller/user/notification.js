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

      let listNotifications = [];

      if (listProducts) {
        for (let i in listProducts) {
          let photo = await Photos.findOne({
            where: { product_id: listProducts[i].id },
          });
          let productData = {
            title: "Berhasil di terbitkan",
            name: listProducts[i].name,
            price: listProducts[i].price,
            date: listProducts[i].createdAt,
            photo: photo.name,
          };
          listNotifications.push(productData);
          let listOffers = await Offers.findAll({
            where: { product_id: listProducts[i].id },
          });

          for (let j in listOffers) {
            if (listOffers[j].product_id == listProducts[i].id) {
              let offerData = {
                title: "Penawaran Produk",
                name: listProducts[i].name,
                price: listProducts[i].price,
                bid_price: listOffers[j].price,
                photo: photo.name,
                date: listOffers[j].createdAt,
              };
              listNotifications.push(offerData);
            }
          }
        }
      }

      let offeredProducts = await Offers.findAll({
        where: { bidder_id: user.id },
      });

      if (offeredProducts) {
        for (let k in offeredProducts) {
          let product = await Products.findOne({
            where: { id: offeredProducts[k].product_id, is_sold: false },
          });
          let photo = await Photos.findOne({
            where: { product_id: product.id },
          });
          if (product) {
            let data = {
              title: "Penawaran Produk",
              name: product.name,
              price: product.price,
              bid_price: offeredProducts[k].price,
              photo: photo.name,
              date: offeredProducts[k].createdAt,
            };
            listNotifications.push(data);

            if (offeredProducts[k].status == true) {
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
