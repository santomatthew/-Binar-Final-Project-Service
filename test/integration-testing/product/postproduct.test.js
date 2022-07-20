const express = require("express");
const request = require("supertest");
const controller = require("../../../controller");
const { Products } = require("../../../models");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.post("/api/v1/newproduct", controller.auth, controller.postProduct);

let token;

let newProduct = {
  name: "Mobil bekas",
  price: 980000,
  category: 3,
  description: "Mobil keychron bekas legenda",
  photo: ["Mobil.com", "Mobil.com"],
};

describe("Create New Product Method", () => {
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

  afterAll(async () => {
    await Products.destroy({ where: { name: newProduct.name } });
  });
  describe("Post Product success should return 201 created and res.body.message =Product product.name berhasil dibuat", () => {
    it("Post product success", (done) => {
      request(app)
        .post("/api/v1/newproduct")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(newProduct)
        .expect(201)
        .then((res) => {
          expect(res.body.message).toBe(
            `Product ${newProduct.name} berhasil dibuat`
          );
          done();
        })
        .catch(done);
    });
  });
  describe("Post product failed", () => {
    it("one of req body = null should return error", (done) => {
      request(app)
        .post("/api/v1/newproduct")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Mobil bekas",
          price: null,
          category: 3,
          description: "Mobil keychron bekas legenda",
          photo: ["Mobil.com", "Mobil.com"],
        })
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBe(`Tidak boleh ada data yang kosong`);
          done();
        })
        .catch(done);
    });
  });
});
