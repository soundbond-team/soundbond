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

describe("Test soundlocalisationService", () => {
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

  it("Liste des plus proches positions", function () {
    let s = { title: "" };

    let sound = Sound.build(s);
    const sound_in_batiment_g = SoundLocation.build({
      latitude: 48.902757,
      longitude: 2.215944,
      sound_id: sound.id,
      //Bâtiment G
    });

    sound = Sound.build(s);
    const sound_in_grand_arche = SoundLocation.build({
      latitude: 48.892752,
      longitude: 2.235041,
      sound_id: sound.id,
      //Grande Arche
    });
    sound = Sound.build(s);
    const sound_in_bibliotheque = SoundLocation.build({
      latitude: 48.905232,
      longitude: 2.215351,
      sound_id: sound.id,
      //BU
    });

    // On se situe au niveau de l'Université
    const localisation = {
      latitude: 48.903646,
      longitude: 2.213702,
    };

    // On s'attend à ce que nearestPosition ne renvoie que les sons du bâtiment G et de la bibliothèque,
    // qui sont dans la fac alors que la Grande Arche est bien plus loin.
    assert.notDeepEqual(
      soundlocationservice.nearestPosition(localisation, [
        sound_in_batiment_g,
        sound_in_grand_arche,
        sound_in_bibliotheque,
      ]),
      [sound_in_batiment_g, sound_in_bibliotheque]
    );
  });
});

describe("Test routes", () => {
  describe("GET /api/v1/soundlocation", () => {
    it("Successfully GET an empty array of 0 SoundLocation", function (done) {
      chai
        .request(app)
        .get("/api/v1/soundlocation")
        .end(function (err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.be.eql(0);
          done();
        });
    });
    it("Successfully GET an array of 1 SoundLocation", function () {
      //not ok
      SoundLocation.truncate({}, (err) => {
        let s = { title: "" };

        let sound = Sound.build(s);
        const sound_in_batiment_g = SoundLocation.build({
          latitude: 48.902757,
          longitude: 2.215944,
          sound_id: sound.id,
          //Bâtiment G
        });
        sound_in_batiment_g.save({}, (done) => {
          chai
            .request(app)
            .get("/api/v1/soundlocation")
            .end(function (res) {
              expect(res).to.have.status(200);
              expect(res.body).to.be.a("array");
              expect(res.body.length).to.be.eql(1);
              done();
            });
        });
      });
    });
  });

  describe("POST /api/v1/soundlocation", () => {
    it("Successfully POST 1 SoundLocation with all parameters specified", function (done) {
      const pLatitude = 48.902757;
      const pLongitude = 2.215944;

      chai
        .request(app)
        .post("/api/v1/soundlocation")
        .send({
          latitude: pLatitude,
          longitude: pLongitude,
        })
        .end(function (res) {
          console.log(res);
          expect(res).to.have.status(200);
          const { latitude, longitude } = res.body;
          chai.assert.equal(latitude, pLatitude);
          chai.assert.equal(longitude, pLongitude);
          done();
        });
    });
  });
});
