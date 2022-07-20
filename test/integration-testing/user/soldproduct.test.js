const express = require("express");

const request = require("supertest");
const controller = require("../../../controller");
const { Products } = require("../../../models");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.get("/api/v1/listsoldproducts", controller.auth, controller.soldProduct);

let token;

describe("Get list sold product method", () => {
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

    await Products.update({ is_sold: true }, { where: { user_id: 1 } });
  });

  afterAll(async () => {
    await Products.update({ is_sold: false }, { where: { user_id: 1 } });
  });

  describe("Get list sold product success", () => {
    it("Get list sold product success should return status code 200 and response list of sold products", (done) => {
      request(app)
        .get("/api/v1/listsoldproducts")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then(async (res) => {
          expect(res.body.products).toBeDefined();
          await Products.update({ is_sold: false }, { where: { user_id: 1 } });
          done();
        })
        .catch(done);
    });
  });

  describe("Get list sold product failed", () => {
    it("Get list sold product failed because no products sold should return message Produk anda belum ada yang terjual", (done) => {
      request(app)
        .get("/api/v1/listsoldproducts")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBe("Produk anda belum ada yang terjual");
          done();
        })
        .catch(done);
    });
  });
});
