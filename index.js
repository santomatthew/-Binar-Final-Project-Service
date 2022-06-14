const express = require("express");
const app = express();
const { PORT = 8000 } = process.env;

const controller = require("./controller/");

app.use(express.json());

// app.get("/", (req, res) => {});

// Users
app.post("/api/v1/login", controller.login);
app.post("/api/v1/register", controller.register);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
