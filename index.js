const express = require("express");
const app = express();
const { PORT = 8000 } = process.env;

const { apply } = require("./router");
apply(app);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
