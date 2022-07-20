const { Users, Photos } = require("../../models");

async function whoAmI(req, res) {
  try {
    let userData = req.userData;

    let person = await Users.findByPk(userData.id);

    let photo = await Photos.findOne(person.photo_id);
    res.status(200).json({
      user_data: {
        id: person.id,
        name: person.name,
        city: person.city,
        address: person.address,
        photo: photo.name,
        phone_number: person.phone_number,
      },
    });
  } catch (error) {
    res.send(error);
  }
}

module.exports = whoAmI;
