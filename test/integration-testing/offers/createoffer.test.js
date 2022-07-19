const express = require("express");
const { Op } = require("sequelize");
const request = require("supertest");
const controller = require("../../../controller");
const { Products, Offers } = require("../../../models");

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

  afterAll(async () => {
    await Offers.destroy({ where: { bidder_id: 1 } });
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

  describe("Post offer failed", () => {
    it("Post offer failed if already offer the product should return status code 409 and response Anda sudah menawar produk ini, silahkan menunggu konfirmasi penjual ", (done) => {
      request(app)
        .post(`/api/v1/offerproduct/${findProduct.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ price: findProduct.price / 2 })
        .expect(409)
        .then(async (res) => {
          expect(res.body.message).toBe(
            "Anda sudah menawar produk ini, silahkan menunggu konfirmasi penjual "
          );
          await Offers.destroy({ where: { bidder_id: 1 } });
          done();
        })
        .catch(done);
    });

    it("Post offer price is higher than the real price should return error", (done) => {
      request(app)
        .post(`/api/v1/offerproduct/${findProduct.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ price: findProduct.price + 1 })
        .then((res) => {
          expect(res.body.message).toBe(
            "Harga tawaran anda tidak bisa lebih besar daripada harga asli"
          );
          done();
        })
        .catch(done);
    });

    it("Post offer price is null should return error response Silahkan isi harga penawaran", (done) => {
      request(app)
        .post(`/api/v1/offerproduct/${findProduct.id}`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send({ price: null })
        .then((res) => {
          expect(res.body.message).toBe("Silahkan isi harga penawaran");
          done();
        })
        .catch(done);
    });

    // it("Post offer fail because product not found should return response Produk tidak ada", (done) => {
    //   request(app)
    //     .post(`/api/v1/offerproduct/${0}`)
    //     .set("Content-Type", "application/json")
    //     .set("Authorization", `Bearer ${token}`)
    //     .send({ price: 4000 })
    //     .then((res) => {
    //       expect(res.body.message).toBe("Produk tidak ada");
    //       done();
    //     })
    //     .catch(done);
    // });
  });
});
