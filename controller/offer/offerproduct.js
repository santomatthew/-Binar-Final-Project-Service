// const { Users } = require("../../models");
const { Products } = require("../../models");
const { Offers } = require("../../models");

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
    console.log(checkOffer);

    if (checkOffer) {
      res.status(409).json({
        message:
          "Anda sudah menawar produk ini, silahkan menunggu konfirmasi penjual ",
      });
    } else {
      let product = await Products.findByPk(inputProductId);

      if (inputPrice) {
        if (inputPrice < product.price) {
          await Offers.create({
            product_id: product.id,
            price: inputPrice,
            bidder_id: userData.id,
          });

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
  } catch (error) {
    res.send(error);
  }
}

module.exports = offerProduct;
