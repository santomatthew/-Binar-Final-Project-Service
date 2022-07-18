const express = require("express");
const { Op } = require("sequelize");
const request = require("supertest");
const controller = require("../../../controller");
const { Products } = require("../../../models");
const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.put("/api/v1/updateproduct/:id", controller.auth, controller.putProduct);

let findOwnedProduct;
let findNotOwnedProduct;

let token;

describe("Put Products method", () => {
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

    const ownedProduct = await Products.findOne({
      where: { user_id: 1 },
    });
    findOwnedProduct = ownedProduct;

    const notOwnedProduct = await Products.findOne({
      where: {
        user_id: {
          [Op.not]: 1,
        },
      },
    });

    findNotOwnedProduct = notOwnedProduct;
  });

  afterAll(() => {});

  describe("Update product success should return status code 200 and response Update product berhasil", () => {
    it("Update product success", (done) => {
      request(app)
        .put(`/api/v1/updateproduct/${findOwnedProduct.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Jam beker tertua di dunia",
          price: 80000,
          category_id: 4,
          description: "Ini adalah jam Beker legenda",
        })
        .then((res) => {
          expect(res.body.message).toBe("Update product berhasil");
          done();
        })
        .catch(done);
    });
  });
  describe("Update another user product should return error 403 and response Anda tidak bisa mengupdate product yang bukan milik anda", () => {
    it("Update product fail", (done) => {
      request(app)
        .put(`/api/v1/updateproduct/${findNotOwnedProduct.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Jam beker tertua di dunia",
          price: 80000,
          category_id: 4,
          description: "Ini adalah jam Beker legenda",
        })
        .expect(403)
        .then((res) => {
          expect(res.body.message).toBe(
            "Anda tidak bisa mengupdate product yang bukan milik anda"
          );
          done();
        })
        .catch(done);
    });
  });
});
