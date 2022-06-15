module.exports = {
  // Users
  login: require("./user/login"),
  register: require("./user/register"),

  //   Encrypt & Decrypt
  encryptPassword: require("./encrypt-decrypt/encrypt"),
  decryptPassword: require("./encrypt-decrypt/decrypt"),

  // Products
  getProducts: require("./product/getproducts"),
  getProductById: require("./product/getproductbyid"),
  postProduct: require("./product/postproduct"),
  putProduct: require("./product/putproduct")
};
