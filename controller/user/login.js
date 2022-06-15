const { Users } = require("../../models");
const decryptPass = require("../encrypt-decrypt/decrypt");

async function login(req, res) {
  try {
    let inputEmail = req.body.email;
    let inputPassword = req.body.password;

    let validateUser = await Users.findOne({ where: { email: inputEmail } });

    if (validateUser) {
      if (inputPassword) {
        let checkDecryptPassword = await decryptPass(
          validateUser.password,
          inputPassword
        );
        if (checkDecryptPassword) {
          res.send("Anda berhasil login");
        } else {
          res.send("Username atau password salah");
        }
      } else {
        res.send("Silahkan mengisi password");
      }
    } else {
      res.status(401).send("Username atau password salah");
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = login;
