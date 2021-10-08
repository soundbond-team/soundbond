const db = require("../models");
const SoundLocation = db.SoundLocation;
const Sound = db.Sound;
const soundlocationservice = require("../services/soundlocationService");

var assert = require("assert");

describe("Test soundlocalisationService", function () {
  /*before(function () {
    console.log("before");
  });*/
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
  it("Liste des plus proches positions", async function (res) {
    let s = { title: "" };
    let sound = await Sound.create(s);
    const sl1 = await SoundLocation.create({
      latitude: 48.902757,
      longitude: 2.215944,
      sound_id: sound.id,
      //Bâtiment G
    });
    sound = await Sound.create(s);
    const sl2 = await SoundLocation.create({
      latitude: 48.892752,
      longitude: 2.235041,
      sound_id: sound.id,
      //Grande Arche
    });
    sound = await Sound.create(s);
    const sl3 = await SoundLocation.create({
      latitude: 48.905232,
      longitude: 2.215351,
      sound_id: sound.id,
      //BU
    });
    console.log(sl3);
    assert.equal(
      soundlocationservice.nearestPosition(48.903646, 2.213702, res),
      [sl1, sl3]
    );
  });
  /*after(function () {
    console.log("after");
  });*/
});
