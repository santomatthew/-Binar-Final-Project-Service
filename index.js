const express = require("express");
const app = express();
const { PORT = 8000 } = process.env;

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
