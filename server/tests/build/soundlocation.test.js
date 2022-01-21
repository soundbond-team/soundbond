const db = require("../../models");
const app = require("../../server");
const SoundLocation = db.SoundLocation;
const Sound = db.Sound;
const soundlocationservice = require("../../services/soundlocationService");

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
