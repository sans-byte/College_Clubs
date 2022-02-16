const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Project = require("../models/projectSchema");
const Authenticate = require("../middleware/authenticate");

// INFO : GET routes
router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/projects", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

// INFO : POST routes
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({ error: "Please provide all the fields" });
  }

  // INFO : Validation if user already exist

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(422).json({ error: "User already exist" });
    }

    // INFO : creating user and saving in database
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

    // INFO : finding user and checking for credentials
    const userLogin = await User.findOne({ email });

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (isMatch) {
        return res.status(200).json({ message: "User signin successfull" });
      } else {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err, "from catch");
  }
});

router.post("/projects", async (req, res) => {
  try {
    const {
      author,
      description,
      memberRequired,
      pings,
      generationDate,
      lastApplyDate,
    } = req.body;

    const project = new Project(req.body);

    await project.save();
    res.status(200).json({ message: "porject posted" });
  } catch (err) {
    console.log(err, "from catch");
  }
});

module.exports = router;
