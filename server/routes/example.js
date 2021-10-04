/* Minimal requiered template for a route. */

const router = require("express").Router(); // Express utilisé car c'est une route
let Example = require("../models/example.model"); // On récupère le modèle

router.route("/").get((req, res) => {
  Example.find()
    .then((examples) => res.json(examples))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const string_attribute = req.body.string_attribute;

  const newExample = new Example({ string_attribute });

  newExample
    .save()
    .then(() => res.json("Example added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
