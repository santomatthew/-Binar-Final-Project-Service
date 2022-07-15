const express = require("express");
const request = require("supertest");
const controller = require("../../../controller");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.get("/api/v1/product/:id", controller.getProductById);
const { Products } = require("../../../models");

const getAllProducts = Products.findAll();

describe("Get Product by id", () => {
  describe("Get product by id Success", () => {
    it("Get Products Success should return 200 and list of products", (done) => {
      request(app)
        .get("/api/v1/product/1")
        .set("Content-Type", "application/json")
        .expect(200)
        .then((res) => {
          expect(res.body).toBeDefined();
          done();
        })
        .catch(done);
    });
  });

  describe("Get product by id not success", () => {
    it("Get Products not success should return 404 not found and res.body.message=Produk tidak ditemukan", (done) => {
      request(app)
        .get(`/api/v1/product/${getAllProducts.length + 1}`)
        .set("Content-Type", "application/json")
        .expect(404)
        .then((res) => {
          expect(res.body.message).toBe("Produk tidak ditemukan");
          done();
        })
        .catch(done);
    });
  });
});
