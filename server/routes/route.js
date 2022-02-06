const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.post("/register", async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    college,
    password,
    confirmPassword,
    interests,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !phoneNumber ||
    !email ||
    !college ||
    !password ||
    !confirmPassword ||
    !interests
  ) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  //NOTE : Validation if user already exist

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    }
    const user = new User(req.body);

    await user.save();
    return res.status(201).json({ message: "Success" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Fill all the fields" });
    }

    const userLogin = await User.findOne({ email });
    if (userLogin) {
      res.status(200).json({ message: "user signedin successfull" });
    } else {
      res.status(400).json({ error: "Sign in failed" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
