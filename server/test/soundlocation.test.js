const db = require("../models");
const SoundLocation = db.SoundLocation;
const soundlocationservice = require("../services/soundlocationService");

var assert = require("assert");
describe("Test soundlocalisationService", function () {
  before(function () {
    console.log("before");
  });
  it("localisation avce N", function () {
    assert.equal(
      soundlocationservice.distance(
        48.8853288,
        2.4030681,
        48.8754857,
        2.4127262,
        "N"
      ),
      0.702839766976638
    );
  });
  it("localisation avce K", function () {
    assert.equal(
      soundlocationservice.distance(
        48.8853288,
        2.4030681,
        48.8754857,
        2.4127262,
        "K"
      ),
      1.3025229870396715
    );
  });

  after(function () {
    console.log("after");
  });
});
