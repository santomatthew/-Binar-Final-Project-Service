const { Users } = require("../../models");
const encryptPassword = require("../encrypt-decrypt/encrypt");

async function register(req, res) {
  try {
    const inputName = req.body.name;
    const inputEmail = req.body.email;
    const inputPassword = req.body.password;

    if (!inputName || !inputEmail || !inputPassword) {
      throw new Error("Data yang diisi harus lengkap");
    }

    let validateEmail = await Users.findOne({ where: { email: inputEmail } });

    if (!validateEmail) {
      await Users.create({
        name: inputName,
        email: inputEmail.toLowerCase(),
        password: await encryptPassword(inputPassword),
      });
      res
        .status(201)
        .json({ message: `Akun dengan email ${inputEmail} berhasil dibuat` });
    } else {
      res.status(409).json({ message: "Email telah digunakan" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = register;
