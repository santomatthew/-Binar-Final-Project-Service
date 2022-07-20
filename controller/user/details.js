const { Users, Photos } = require("../../models");

async function details(req, res) {
  try {
    let userData = req.userData;

    let checkUser = await Users.findByPk(userData.id);

    if (checkUser) {
      let inputCity = req.body.city;
      let inputAddress = req.body.address;
      let inputPhone = req.body.phone_number;
      let inputPhoto = req.body.photo;

      let uploadPhoto = await Photos.create({
        name: inputPhoto,
      });

      if (checkUser.photo_id) {
        await Photos.destroy({ where: { id: checkUser.photo_id } });
      }

      await Users.update(
        {
          city: inputCity,
          address: inputAddress,
          phone_number: inputPhone,
          photo_id: uploadPhoto.id,
        },
        {
          where: { id: userData.id },
        }
      );

      res.json({
        message: "Update data berhasil",
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
}

module.exports = details;
