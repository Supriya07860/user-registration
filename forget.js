const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");

router.post("/forgetpassword", (req, res) => {
  const { email } = req.body;

  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.
      status(400).json({ error: "Email not found" });
    }});
});

module.exports = router;  