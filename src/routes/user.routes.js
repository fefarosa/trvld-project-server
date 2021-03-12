/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable no-trailing-spaces */
/* eslint-disable padded-blocks */
/* eslint-disable import/no-unresolved */
/* eslint-disable consistent-return */
/* eslint-disable quotes */
const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  const errors = {};

  if (!name || typeof name !== "string" || name.length > 50) {
    errors.name = "username is required and should be 50 characters max.";
  }

  if (!email || !email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
    errors.email = "email is required and should be a valid email address.";
  }

  if (
    !password ||
    !password.match(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    )
  ) {
    errors.password =
      "password is required, should be at least 8 characters long, should contain an uppercase letter, lowercase letter, a number and a special character.";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  try {
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds);

    const passwordHash = await bcrypt.hash(password, salt);

    const result = await User.create({ email, name, passwordHash });

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ error: err.message });
    } else if (err.code === 11000) {
      res.status(400).json({
        error:
          "name and email need to be unique. either username or email is already used.",
      });
    }
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ msg: err });
    }

    if (!user || info) {
      return res.status(401).json({ msg: info.message });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }

      const { name, email, _id } = user;
      const userObj = { name, email, _id };
      const token = jwt.sign({ user: userObj }, process.env.TOKEN_SIGN_SECRET);

      return res.status(200).json({ user: userObj, token });
    });
  })(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      console.log(req.user);

      const result = await User.findOne({ _id: req.user._id });

      res
        .status(200)
        .json({ message: "This is a protected route", user: result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ msg: err });
    }
  }
);

module.exports = router;
