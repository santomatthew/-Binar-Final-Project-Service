const express = require("express");
const request = require("supertest");
const controller = require("../../controller");

const app = express();
// const router = require("../../router");

jest.setTimeout(20000);
app.use(express.json());
app.post("/api/v1/login", controller.login);

const validAccount = {
  email: "santo@gmail.com",
  password: "12345678",
};

const invalidEmail = {
  email: "invalidemail@gmail.com",
  password: "12345678",
};

const invalidAccount = {
  email: "santo@gmail.com",
  password: "wrongpassword",
};

describe("Login POST /api/v1/login", () => {
  describe("Login Succesfull", () => {
    it("Login success= return status code 200 and return access_token", (done) => {
      request(app)
        .post("/api/v1/login")
        .set("Content-Type", "application/json")
        .send({ email: validAccount.email, password: validAccount.password })
        .expect(200)
        .then((res) => {
          expect(res.body.access_token).toBeTruthy();
          done();
        })
        .catch(done);
    });
  });

  describe("Login not success", () => {
    it("Wrong password should return 401 Unauthorized and res.body.message = username atau password salah", (done) => {
      request(app)
        .post("/api/v1/login")
        .set("Content-Type", "application/json")
        .send({
          email: invalidAccount.email,
          password: invalidAccount.password,
        })
        .expect(401)
        .then((res) => {
          expect(res.body.message).toBe("Username atau password salah");
          done();
        })
        .catch(done);
    });

    it("Wrong password should return 401 Unauthorized and res.body.message = username atau password salah", (done) => {
      request(app)
        .post("/api/v1/login")
        .set("Content-Type", "application/json")
        .send({
          email: invalidAccount.email,
          password: null,
        })
        .expect(401)
        .then((res) => {
          expect(res.body.message).toBe("Silahkan mengisi password");
          done();
        })
        .catch(done);
    });

    it("User not found should return 401 Unauthorized and res.body.message = username atau password salah", (done) => {
      request(app)
        .post("/api/v1/login")
        .set("Content-Type", "application/json")
        .send({
          email: invalidEmail.email,
          password: invalidEmail.password,
        })
        .expect(401)
        .then((res) => {
          expect(res.body.message).toBe("Username atau password salah");
          done();
        })
        .catch(done);
    });

    it("Email empty should return 401 Unauthorized and return res.body.error = Email wajib diisi", (done) => {
      request(app)
        .post("/api/v1/login")
        .set("Content-Type", "application/json")
        .send({
          email: null,
          password: invalidEmail.password,
        })
        .expect(401)
        .then((res) => {
          expect(res.body.message).toBe("Email wajib diisi");
          done();
        })
        .catch(done);
    });
  });
});
