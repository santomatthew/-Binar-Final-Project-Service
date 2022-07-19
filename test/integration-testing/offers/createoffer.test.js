const express = require("express");
const { Op } = require("sequelize");
const request = require("supertest");
const controller = require("../../../controller");
const { Products } = require("../../../models");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.post("/api/v1/offerproduct/:id", controller.auth, controller.offerProduct);

let findProduct;

let token;
describe("Post Offer Product method", () => {
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

    let findNotOwnedProduct = await Products.findOne({
      where: {
        user_id: {
          [Op.not]: 1,
        },
      },
    });

    findProduct = findNotOwnedProduct;
  });
  describe("Post offer success", () => {
    it("Post offer success should return status code 201 and response Tawaran harga pada produk berhasil dibuat. Silahkan menunggu respon dari penjual", (done) => {
      request(app)
        .post(`/api/v1/offerproduct/${findProduct.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ price: findProduct.price / 2 })
        .expect(201)
        .then((res) => {
          expect(res.body.message).toBe(
            "Tawaran harga pada produk berhasil dibuat. Silahkan menunggu respon dari penjual"
          );
          done();
        })
        .catch(done);
    });
  });

  describe("Post offer failed", () => {});
});
