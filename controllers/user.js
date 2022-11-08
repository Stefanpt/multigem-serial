const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function create(req, res) {
  const { email, password } = req.body;

  const newUser = new User({
    email: email,
    password: password
  })

  newUser.save(function(error, newItem) {
    if (error) {
      res.json({
        message: "failed to create user"
      });
    } else {
      res.json({
        message: "create user successfully",
        newItem,
      });
    }
  })
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({
    email
  });

  if (!user) {
    throw Error("User not found");
  }

  if (bcrypt.compareSync(password, user.password)) {

    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: "24h"
    });

    res.json({
      message: "Successfully Logged in",
      user,
      token,
    });

  } else {
    res.status(401).json({
      message: "Unauthenticated"
    });
  }
}

async function getAll(req, res) {
  const user = await User.find({});
  res.json({
    user,
    message: "create user successfully"
  });
}

async function get(req, res) {
  const user = await User.findOne({
    _id: req.params.id
  });
  res.json({
    user,
    message: "create user successfully"
  });
}

module.exports = {
  create,
  login,
  get,
  getAll,
};