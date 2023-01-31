const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/register", (req, res) => {
  const { email, password, username } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    } else {
      const newUser = new User({
        email,
        password,
        username,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
