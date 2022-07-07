const { Products, Offers, Users, Notifications } = require("../../models");

const jwt = require("jsonwebtoken");

async function offerProduct(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    let inputPrice = req.body.price;
    let inputProductId = req.params.id;

    let checkOffer = await Offers.findOne({
      where: { product_id: inputProductId, bidder_id: userData.id },
    });

    let product = await Products.findByPk(inputProductId);

    if (product.is_sold == false) {
      if (checkOffer) {
        res.status(409).json({
          message:
            "Anda sudah menawar produk ini, silahkan menunggu konfirmasi penjual ",
        });
      } else {
        if (inputPrice) {
          if (inputPrice < product.price) {
            let checkOfferStatus = await Offers.findOne({
              where: { product_id: product.id, status: true },
            });

            let offer;

            if (checkOfferStatus) {
              offer = await Offers.create({
                product_id: product.id,
                price: inputPrice,
                bidder_id: userData.id,
                status: false,
              });
            } else {
              offer = await Offers.create({
                product_id: product.id,
                price: inputPrice,
                bidder_id: userData.id,
              });
            }

            for (let i = 0; i <= 1; i++) {
              let id = userData.id;
              if (i % 2 == 1) {
                let owner = await Users.findByPk(product.user_id);
                id = owner.id;
              }

              await Notifications.create({
                user_id: id,
                product_id: product.id,
                offer_id: offer.id,
                title: "Penawaran produk",
              });
            }

            res.status(201).json({
              message: `Tawaran harga pada produk ${product.name} berhasil dibuat. Silahkan menunggu respon dari penjual`,
            });
          } else {
            res.send(
              "Harga tawaran anda tidak bisa lebih besar daripada harga asli"
            );
          }
        } else {
          res.send("Silahkan isi harga penawaran");
        }
      }
    } else {
      res.json({
        message: `Produk tidak ada`,
      });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = offerProduct;
