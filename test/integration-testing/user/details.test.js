const express = require("express");

const request = require("supertest");
const controller = require("../../../controller");

const app = express();

jest.setTimeout(20000);
app.use(express.json());
app.put("/api/v1/update", controller.auth, controller.details);

let token;

const updateData = {
  city: "Kajarta",
  address: "Jl sumarsono",
  phone_number: "08788923889",
  photo: "www.google.com/pics2",
};

describe("Update detail user method", () => {
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
  describe("Update success", () => {
    it("Update success should return status code 200 and resposne Update data berhasil", (done) => {
      request(app)
        .put("/api/v1/update")
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${token}`)
        .send(updateData)
        .expect(200)
        .then((res) => {
          expect(res.body.message).toBe("Update data berhasil");
          done();
        })
        .catch(done);
    });
  });
});
