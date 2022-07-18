const express = require("express");
const request = require("supertest");
const controller = require("../../../controller");

const app = express();

jest.setTimeout(20000);
app.use(express.json());

let token;

let newProduct = {
  name: "Mobil bekas",
  price: 980000,
  category: 3,
  description: "Mobil keychron bekas legenda",
  photo: ["Mobil.com", "Mobil.com"],
};

describe("Post Product Method", () => {
  describe("Post Product success should return 201 created and res.body.message =Product product.name berhasil dibuat", (done) => {
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

    it("Post product success", (done) => {
      app.post("api/v1/newproduct", controller.auth, controller.postProduct);

      request(app)
        .post("/api/v1/newproduct")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(newProduct)
        .expect(404)
        .then((res) => {
          console.log(res.body);
          expect(res.body.message).toBe(
            `Produk ${newProduct.name} berhasil dibuat`
          );
          done();
        })
        .catch(done);
    });

    describe("Post product failed", (done) => {});
  });
});
