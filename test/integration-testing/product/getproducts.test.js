const express = require("express");
const request = require("supertest");
const controller = require("../../../controller");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.get("/api/v1/products", controller.getProducts);

describe("Get Products", () => {
  it("Get Products Success should return 200 and list of products", (done) => {
    request(app)
      .get("/api/v1/products")
      .set("Content-Type", "application/json")
      .expect(200)
      .then((res) => {
        // console.log(res.body.products);
        expect(res.body).toBeDefined();
        done();
      })
      .catch(done);
  });
});
