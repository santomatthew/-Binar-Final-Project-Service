const express = require("express");
const request = require("supertest");
const controller = require("../../controller");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.get("/api/v1/products", controller.getProducts);

// const product = {
//   id: 1,
//   name: "Jam Beker",
//   price: 80000,
//   category: "Elektronik",
//   description: "Ini adalah jam Beker legenda",
//   user_name: "Santo",
//   is_sold: false,
//   photo: "https://www.ikea.co.id/in/produk/dekorasi/jam/degade-art-40490539",
// };

describe("Get Products", () => {
  it("Get Products Success should return 200 and list of products", (done) => {
    request(app)
      .get("/api/v1/products")
      .set("Content-Type", "application/json")
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body).toBeDefined();
        done();
      })
      .catch(done);
  });
});
