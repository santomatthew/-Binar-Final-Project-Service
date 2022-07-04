const express = require("express");
const app = express();
const { PORT = 8000 } = process.env;
const cors = require("cors");

const controller = require("./controller");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Berhasil deploy");
});

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
app.post("/api/v1/offerproduct/:id", controller.auth, controller.offerProduct);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
