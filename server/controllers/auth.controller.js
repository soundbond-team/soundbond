const db = require("../models");
const User = db.User;
const UserService = require("../services/userService");
const Playlist = db.Playlist;

module.exports.signUp = async (req, res) => {
  const username = req.body.username;
  let password = req.body.password;

  password = await UserService.crypt(password);

  try {
    const user = await User.create({ username, password });

    const history = {
      title: "History",
      description: req.body.username + "'s History",
      publisher_user_id: user.id,
    };
  
    await Playlist.create(history);
    res.status(201).json({ user: user.id });
  } catch (err) {
    res.status(200).send({ err });
  }
};

module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserService.compare(username, password);
    if (user != null) {
      const token = UserService.createToken(user.id);

      res.cookie("jwt", token, { httpOnly: true, maxAge: UserService.maxAge });
      res.status(200).json({ user: user.id });
    } else {
      res.status(200).send(null);
    }
  } catch (err) {
    res.status(200).send(err);
  }
};

module.exports.logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
