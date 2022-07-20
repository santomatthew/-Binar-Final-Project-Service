const express = require("express");

const request = require("supertest");
const controller = require("../../../controller");
const { Offers } = require("../../../models");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.get(
  "/api/v1/listofferedproducts",
  controller.auth,
  controller.offeredProduct
);

let token;

describe("Get list offered product method", () => {
  beforeAll(async () => {
    app.post("/api/v1/login", controller.login);

    const account = {
      email: "santo@gmail.com",
      password: "12345678",
    };
    await request(app)
      .post("/api/v1/login")
      .send(account)
      .then((res) => {
        expect(res.body.access_token).toBeTruthy();
        token = res.body.access_token;
      });

    await Offers.create({ product_id: 1, price: 500, bidder_id: 2 });
  });

  afterAll(async () => {
    await Offers.destroy({ where: { product_id: 1 } });
  });
  describe("Get list offered product success", () => {
    it("Get List offered product success should return status code 200 and response list of offered product", (done) => {
      request(app)
        .get("/api/v1/listofferedproducts")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(async (res) => {
          expect(res.body.products).toBeTruthy();
          await Offers.destroy({ where: { product_id: 1 } });
          done();
        })
        .catch(done);
    });
  });

  describe("Get list offered product fail", () => {
    it("No one offer your product should return message Produk anda belum ada yang minat", (done) => {
      request(app)
        .get("/api/v1/listofferedproducts")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBe("Produk anda belum ada yang minat");
          done();
        })
        .catch(done);
    });
  });
});
