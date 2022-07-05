module.exports = {
  // Users
  login: require("./user/login"),
  register: require("./user/register"),
  productsOnSale: require("./user/productsonsale"),
  offeredProduct: require("./user/offeredproduct"),
  soldProduct: require("./user/soldproduct"),
  details: require("./user/details"),
  notification: require("./user/notification"),
  updateNotification: require("./user/updatenotification"),

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
  updateOffer: require("./offer/updateoffer"),
  finishOffer: require("./offer/finishoffer"),

  // Middleware
  auth: require("./middleware/auth"),
  uploadPhoto: require("./middleware/upload"),
  postPhoto: require("./middleware/postphoto"),
};
