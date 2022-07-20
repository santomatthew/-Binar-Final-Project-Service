const express = require("express");
const request = require("supertest");
const controller = require("../../../controller");

const app = express();
// const router = require("../../router");

jest.setTimeout(20000);
app.use(express.json());
app.get("/api/v1/whoami", controller.auth, controller.whoAmI);

let token;

describe("Get Whoami method", () => {
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

  describe("Get Whoami success should return status code 200", () => {
    it("Whoami success", (done) => {
      request(app)
        .get("/api/v1/whoami")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .then((res) => {
          expect(res.body.user_data).toBeDefined();
          done();
        })
        .catch(done);
    });
  });
});
