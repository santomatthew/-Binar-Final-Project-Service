const express = require("express");

const request = require("supertest");
const controller = require("../../../controller");
const { Products } = require("../../../models");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.get(
  "/api/v1/listonsaleproducts",
  controller.auth,
  controller.productsOnSale
);

let token;

describe("Get list on sale products method", () => {
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
  });

  afterAll(() => {});

  describe("Get list on sale products success", () => {
    it("Get list on sale products success should return status code 200 and response list of on sale products", (done) => {
      request(app)
        .get("/api/v1/listonsaleproducts")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(async (res) => {
          expect(res.body.products).toBeDefined();
          await Products.update({ is_sold: true }, { where: { user_id: 1 } });
          done();
        })
        .catch(done);
    });
  });
  describe("Get list on sale products failed", () => {
    it("Get list on sale products success should return status code 200 and response list of on sale products", (done) => {
      request(app)
        .get("/api/v1/listonsaleproducts")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
          expect(res.body.message).toBe(
            "Kamu belum memiliki barang yang dijual"
          );
          done();
        })
        .catch(done);
    });
  });
});
