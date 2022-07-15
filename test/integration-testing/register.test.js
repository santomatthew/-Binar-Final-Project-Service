const express = require("express");
const request = require("supertest");
const controller = require("../../controller");
const { Users } = require("../../models");

const app = express();

jest.setTimeout(20000);
app.use(express.json());

app.post("/api/v1/register", controller.register);

const newAccount = {
  name: "NewAccount",
  email: "NewAccount123@gmail.com",
  password: "newpassword",
};

const registeredAccount = {
  name: "santo",
  email: "santo@gmail.com",
  password: "12345678",
};

describe("Register Method", () => {
  describe("Register successfull", () => {
    beforeAll(async () => {
      await Users.create(registeredAccount);
    });

    afterAll(async () => {
      await Users.destroy({
        where: {
          name: newAccount.name,
          email: newAccount.email,
        },
      });

      await Users.destroy({
        where: {
          name: registeredAccount.name,
          email: registeredAccount.email,
        },
      });
    });

    it("Register success should return status 201 created", (done) => {
      request(app)
        .post("/api/v1/register")
        .set("Content-Type", "application/json")
        .send(newAccount)
        .expect(201)
        .then((res) => {
          expect(res.body.message).toBe(
            `Akun dengan email ${newAccount.email} berhasil dibuat`
          );
          done();
        })
        .catch(done);
    });
  });

  describe("Register unsuccess", () => {
    it("Email already used", (done) => {
      request(app)
        .post("/api/v1/register")
        .set("Content-Type", "application/json")
        .send(registeredAccount)
        .expect(409)
        .then((res) => {
          expect(res.body.message).toBe(`Email telah digunakan`);
          done();
        })
        .catch(done);
    });
    it("One of the field is empty should return 401 Unauthorized", (done) => {
      request(app)
        .post("/api/v1/register")
        .set("Content-Type", "application/json")
        .send({ email: null, password: null })
        .expect(401)
        .then((res) => {
          expect(res.body.message).toBe(`Data yang diisi harus lengkap`);
          done();
        })
        .catch(done);
    });
  });
});
