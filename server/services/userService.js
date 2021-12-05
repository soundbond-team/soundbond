const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.User;

const maxAge = 3 * 24 * 60 * 60 * 1000;

async function crypt(password) {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
}

function createToken(id) {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
}

let compare = async function (username, password) {
  const user = await User.findOne({ where: { username: username } });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);

    if (auth) {
      return user;
    }
    return null;
  }
  return null;
};
module.exports = { createToken, crypt, maxAge, compare };
