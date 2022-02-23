const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const UserData = require("../models/userDataSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Project = require("../models/projectSchema");
const Authenticate = require("../middleware/authenticate");
const {
  registerController,
  activationController,
  userInfoController,
} = require("../middleware/authController");
const e = require("express");

// INFO : GET routes
router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/userinfo/:id", async (req, res) => {
  const id = req.params.id;
  await User.findById(id).exec(async (err, foundUser) => {
    if (err) {
      console.log("This is from route.js 24");
      console.log(err);
      return res
        .status(400)
        .json({ error: "Something is wrong in route.js 26" });
    } else {
      if (!foundUser.info) {
        return res
          .status(400)
          .json({ message: "Everything is fine till now 33" });
      } else {
        const userDataId = foundUser.info._id;
        await UserData.findById(userDataId).exec(async (err, foundData) => {
          if (err) {
            console.log("This error is form route.js 32");
            console.log(err);
            return res
              .status(400)
              .json({ error: "No userData found in route.js 38" });
          } else {
            if (!foundData) {
              return res
                .status(400)
                .json({ error: "No userData found in route.js 41" });
            } else {
              console.log("This message is from route.js 43");
              return res
                .status(200)
                .json({ message: "Everything is fine till now 44" });
            }
          }
        });
      }
    }
  });
});

router.get("/projects/:id", Authenticate, (req, res) => {
  console.log(req.params);
  res.send(req.rootUser);
});

// INFO : POST routes

router.post("/userinfo/:id", userInfoController);
router.post("/register", registerController);
router.post("/activation", activationController);
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Fill all the fields" });
    }

    // INFO : finding user and checking for credentials
    const userLogin = await User.findOne({ email });
    console.log(userLogin);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (isMatch) {
        return res.status(200).send(userLogin);
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
