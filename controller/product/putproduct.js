const { Products, Notifications, Photos } = require("../../models");

async function putProduct(req, res) {
  try {
    let userData = req.userData;
    const inputId = req.params.id;

    const product = await Products.findByPk(inputId);

    const inputPhoto = req.body.photo;

    if (product) {
      if (product.user_id == userData.id) {
        let productData = {
          name: product.name,
          price: product.price,
          description: product.description,
          category_id: product.category_id,
        };
        productData = Object.assign(productData, req.body);

        const updateProduct = await Products.update(productData, {
          where: { id: inputId },
        });

        if (updateProduct) {
          if (inputPhoto) {
            let indexOfPhotos = 0;
            const productPhotos = await Photos.findAll({
              where: { product_id: product.id },
            });
            for (let i in inputPhoto) {
              const checkProductPhotos = await Photos.findAll({
                where: { product_id: product.id },
              });
              if (checkProductPhotos.length < 4) {
                await Photos.create({
                  name: inputPhoto[i],
                  product_id: product.id,
                });
              } else {
                await Photos.update(
                  {
                    name: inputPhoto[i],
                  },
                  {
                    where: {
                      id: productPhotos[indexOfPhotos].id,
                    },
                  }
                );
                if (indexOfPhotos < 4) {
                  indexOfPhotos++;
                } else {
                  indexOfPhotos = 0;
                }
              }
            }
          }

          await Notifications.create({
            user_id: userData.id,
            product_id: inputId,
            title: "Berhasil di update",
          });
          res.status(200).json({ message: `Update product berhasil` });
        }
      } else {
        res.status(403).json({
          message: "Anda tidak bisa mengupdate product yang bukan milik anda",
        });
      }
    } else {
      res.json({ message: "Produk yang ingin di update tidak ada" });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}
module.exports = putProduct;
