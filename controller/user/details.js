const { Users } = require("../../models");

const jwt = require("jsonwebtoken");

async function details(req, res) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");

    if (userData.id == req.params.id) {
      let inputCity = req.body.city;
      let inputAddress = req.body.address;
      let inputPhone = req.body.phone_number;
      let inputPhoto = req.body.photo;

      await Users.update(
        {
          city: inputCity,
          address: inputAddress,
          phone_number: inputPhone,
          photo: inputPhoto,
        },
        {
          where: { id: req.params.id },
        }
      );
      res.json({
        message: "Update data berhasil",
      });
    } else {
      res.status(401).json({
        message: "Anda tidak bisa melengkapi akun yang bukan milik anda",
      });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = details;
