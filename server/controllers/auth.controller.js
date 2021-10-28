const db = require("../models");
const User = db.User;
const UserService = require("../services/userService");

module.exports.signUp = async (req, res) => {
  const username = req.body.username;
  let password = req.body.password;

  password = await UserService.crypt(password);

  try {
    const user = await User.create({ username, password });
    res.status(201).json({ user: user.id });
  } catch (err) {
    //const errors = signUpErrors(err);
    res.status(200).send({ err });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  try {
    const user = await UserService.compare(username, password);
    console.log(user.id);
    const token = UserService.createToken(user.id);
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true, maxAge: UserService.maxAge });
    res.status(200).json({ user: user.id });
  } catch (err) {
    res.status(200).send(err);
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
