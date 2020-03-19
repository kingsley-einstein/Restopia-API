const { expect } = require("chai");
const request = require("supertest");
const { User } = require("../db");
const app = require("..");

const root = "/api/v1";
const email = "testemail@app.com";
const password = "password";
let token = null;

describe("API TESTS", () => {
  describe("Users", () => {
    it("should create a user", (done) => {
      request(app)
        .post(`${root}/user`)
        .send({ email, password })
        .end((err, res) => {
          const { status, body } = res;
          token = body.data.token;
          console.table([body.data]);
          expect(status).to.be.eql(201);
          done(err);
        });
    });
    it("should log a user in", (done) => {
      request(app)
        .post(`${root}/user/login`)
        .send({ email, password })
        .end((err, res) => {
          const { status, body } = res;
          token = body.data.token;
          console.table([body.data]);
          expect(status).to.be.eql(200);
          done(err);
        });
    });
    it("should get a logged user", (done) => {
      request(app)
        .get(`${root}/user/logged`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          const { status, body } = res;
          console.table([body.data]);
          expect(status).to.be.eql(200);
          done(err);
        });
    });
  });
  after((done) => {
    User.deleteMany({}).then(() => {
      done();
    });
  });
});
