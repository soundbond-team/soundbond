/* Minimal requiered template for a Mongoose model. */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Toutes les options ne sont pas nécessaires.
const myModel = new Schema(
  {
    string_attribute: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
  },
  {
    timestamps: true,
  }
);

const MyModel = mongoose.model("MyModel", myModel);

module.exports = MyModel;
