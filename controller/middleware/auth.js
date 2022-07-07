const jwt = require("jsonwebtoken");
const { Users } = require("../../models");

async function auth(req, res, next) {
  try {
    let header = req.headers.authorization.split("Bearer ")[1];
    let userData = jwt.verify(header, "s3cr3t");
    let checkUser = await Users.findByPk(userData.id);
    if (checkUser) {
      req.userData = checkUser;
      next();
      return;
    } else {
      res.status(403).json({
        message: "Forbidden",
      });
      return;
    }
  } catch (err) {
    res.status(403).json({
      message: "Forbidden",
    });
    return;
  }
}
module.exports = auth;
