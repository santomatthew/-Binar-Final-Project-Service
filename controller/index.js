module.exports = {
  // Users
  login: require("./user/login"),
  register: require("./user/register"),
  productsOnSale: require("./user/productsonsale"),
  offeredProduct: require("./user/offeredproduct"),
  soldProduct: require("./user/soldproduct"),

  //   Encrypt & Decrypt
  encryptPassword: require("./encrypt-decrypt/encrypt"),
  decryptPassword: require("./encrypt-decrypt/decrypt"),

  // Products
  getProducts: require("./product/getproducts"),
  getProductById: require("./product/getproductbyid"),
  postProduct: require("./product/postproduct"),
  putProduct: require("./product/putproduct"),
  deleteProduct: require("./product/deleteproduct"),

  // Offer Product
  offerProduct: require("./offer/offerproduct"),

  // Middleware
  auth: require("./middleware/auth"),
};
