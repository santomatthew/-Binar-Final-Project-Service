const { Users } = require("../../models");
const encryptPassword = require("../encrypt-decrypt/encrypt");

async function register(req, res) {
  try {
    const inputName = req.body.name;
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    let validateEmail = await Users.findOne({ where: { email: inputEmail } });

    if (!validateEmail) {
      await Users.create({
        name: inputName,
        email: inputEmail,
        password: await encryptPassword(inputPassword),
      });
      res.status(201).send(`Akun dengan email ${inputEmail} berhasil dibuat`);
    } else {
      res.status(409).send("Email telah digunakan");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = register;
