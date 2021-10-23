const db = require("../models");
const app = require("../server");
const Sound = db.Sound;

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
var expect = chai.expect;

chai.use(chaiHttp);

describe("Test routes", () => {
  describe("GET /api/v1/sound", () => {
    it("Successfully GET an empty array of 0 Sound", function (done) {
      chai
        .request(app)
        .get("/api/v1/sound")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.be.eql(0);
          done();
        });
    });
    it("Successfully GET an array of 1 Sound", function (done) {});
  });
  describe("POST /api/v1/sound", () => {
    it("Successfully POST 1 Sound with all parameters specified", (done) => {
      const data = {
        url: "url",
        size: 50,
        codec: "codec",
        startTime: 5,
        stopTime: 10,
        duration: 5,
        uploader_user_id: 1,
        soundlocation_id: id_soundlocation,
      };

      chai
        .request(app)
        .post("/api/v1/sound")
        .send({
          url: data.url,
          size: data.size,
          codec: data.codec,
          startTime: data.startTime,
          stopTime: data.stopTime,
          duration: data.duration,
          uploader_user_id: data.uploader_user_id,
          soundlocation_id: data.soundlocation_id,
        })
        .end((err, res) => {
          res.should.have.status(200);
          const { name, price, quantity, isListed } = res.body;
          chai.assert.equal(name, p_name);
          chai.assert.equal(price, p_price);
          chai.assert.equal(quantity, p_quantity);
          chai.assert.equal(isListed, p_isListed);
          done();
        });
    });
  });
  describe("PUT /api/v1/soundlocation", () => {});
  describe("DELETE /api/v1/soundlocation", () => {});
});
