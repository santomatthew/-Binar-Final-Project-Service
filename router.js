const cors = require("cors");
const express = require("express");

const controller = require("./controller");

function apply(app) {
  app.use(cors());
  app.use(express.json());

  app.get("/", controller.success);

  // Users
  app.post("/api/v1/login", controller.login);
  app.post("/api/v1/register", controller.register);
  app.post(
    "/api/v1/uploadphoto/",
    controller.uploadPhoto.user,
    controller.postPhoto
  );
  app.put("/api/v1/update", controller.auth, controller.details);
  app.get(
    "/api/v1/listonsaleproducts",
    controller.auth,
    controller.productsOnSale
  );
  app.get(
    "/api/v1/listofferedproducts",
    controller.auth,
    controller.offeredProduct
  );
  app.get("/api/v1/listsoldproducts", controller.auth, controller.soldProduct);
  app.get("/api/v1/notification", controller.auth, controller.notification);
  app.put(
    "/api/v1/updatenotif/:id",
    controller.auth,
    controller.updateNotification
  );

  // Products
  app.get("/api/v1/products", controller.getProducts);
  app.get("/api/v1/product/:id", controller.getProductById);
  app.post("/api/v1/newproduct", controller.auth, controller.postProduct);
  app.post(
    "/api/v1/uploadphotoproduct",
    controller.uploadPhoto.product,
    controller.postPhoto
  );
  app.put("/api/v1/updateproduct/:id", controller.auth, controller.putProduct);
  app.delete(
    "/api/v1/deleteproduct/:id",
    controller.auth,
    controller.deleteProduct
  );

  // Offer
  app.post(
    "/api/v1/offerproduct/:id",
    controller.auth,
    controller.offerProduct
  );
  app.put("/api/v1/updateoffer/:id", controller.auth, controller.updateOffer);
  app.put("/api/v1/finishoffer/:id", controller.auth, controller.finishOffer);

  return app;
}

module.exports = { apply };
