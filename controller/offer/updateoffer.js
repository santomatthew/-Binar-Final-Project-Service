const { Offers, Users, Products } = require("../../models");
const jwt = require("jsonwebtoken");

async function updateOffer(req, res) {
  let header = req.headers.authorization.split("Bearer ")[1];
  let userData = jwt.verify(header, "s3cr3t");
}

module.exports = updateOffer;
