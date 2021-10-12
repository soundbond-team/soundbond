const db = require("../models");
const app = require("../server");
const SoundLocation = db.SoundLocation;
const Sound = db.Sound;
const soundlocationservice = require("../services/soundlocationService");

const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = require("assert");
var expect = chai.expect;

chai.use(chaiHttp);

describe("Test soundlocalisationService", function () {
  it("Localisation avec N", function () {
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
  it("Localisation avec K", function () {
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
  it("Liste des plus proches positions", async function () {
    let s = { title: "" };
    let sound = await Sound.build(s);
    const sl1 = await SoundLocation.build({
      latitude: 48.902757,
      longitude: 2.215944,
      sound_id: sound.id,
      //Bâtiment G
    });
    sound = await Sound.build(s);
    const sl2 = await SoundLocation.build({
      latitude: 48.892752,
      longitude: 2.235041,
      sound_id: sound.id,
      //Grande Arche
    });
    sound = await Sound.build(s);
    const sl3 = await SoundLocation.build({
      latitude: 48.905232,
      longitude: 2.215351,
      sound_id: sound.id,
      //BU
    });
    const localisation = {
      latitude: 48.903646,
      longitude: 2.213702,
    };
    assert.notDeepEqual(
      soundlocationservice.nearestPosition(localisation, [sl1, sl2, sl3]),
      [sl1, sl3]
    );
  });
});
/*
describe("Test routes", function () {
  it("/GET All SoundLocations -> 200 status", function (done) {
    chai
      .request(app)
      .get("/api/v1/soundlocation")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("/GET First SoundLocation -> 200 status", function (done) {
    chai
      .request(app)
      .get("/api/v1/soundlocation/1")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
      });
  });
});
*/
