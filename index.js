const express = require("express");
const app = express();
const { PORT = 8000 } = process.env;

const controller = require("./controller/");

app.use(express.json());

// app.get("/", (req, res) => {});

// Users
app.post("/api/v1/login", controller.login);
app.post("/api/v1/register", controller.register);

// Products
app.get("/api/v1/products", controller.getProducts);
app.get("/api/v1/product/:id", controller.getProductById);
app.post("/api/v1/newproduct",controller.postProduct)
app.put("/api/v1/updateproduct/:id",controller.putProduct)
app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
