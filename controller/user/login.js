const { Users } = require("../../models");
const decryptPassword = require("../encrypt-decrypt/decrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;
    if (!inputEmail) {
      throw new Error("Email wajib diisi");
    }

    let validateUser = await Users.findOne({
      where: { email: inputEmail.toLowerCase() },
    });

    if (validateUser) {
      if (inputPassword) {
        let checkDecryptPassword = await decryptPassword(
          validateUser.password,
          inputPassword
        );
        if (checkDecryptPassword) {
          let userData = {
            id: validateUser.id,
            name: validateUser.name,
            email: validateUser.email,
          };
          let token = jwt.sign(userData, "s3cr3t");
          res.status(200).json({
            access_token: token,
          });
        } else {
          res.status(401).json({ message: "Email atau password salah" });
        }
      } else {
        res.status(401).json({ message: "Silahkan mengisi password" });
      }
    } else {
      res.status(401).json({ message: "Email atau password salah" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = login;
