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
      console.log(err);
      return res.status(400).json({ error: "Something is wrong in route.js " });
    } else {
      if (!foundUser.info) {
        return res
          .status(400)
          .json({ message: "Everything is fine till now from route.js" });
      } else {
        const userDataId = foundUser.info._id;
        await UserData.findById(userDataId).exec(async (err, foundData) => {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .json({ error: "No userData found in route.js " });
          } else {
            if (!foundData) {
              return res
                .status(400)
                .json({ error: "No userData found in route.js " });
            } else {
              return res.status(200).send(foundData);
            }
          }
        });
      }
    }
  });
});

router.get("/user/:id", Authenticate, (req, res) => {
  console.log(req.params);
  res.send(req.rootUser);
});

router.get("/projects/:interest", async (req, res) => {
  const { interest } = req.params;
  await Project.find({ interest }, (err, projectList) => {
    if (err) {
      console.log(err, "from get projects");
      return res.status(400).json({"error":"Something went wrong in route.js get projects"});
    } else {
      console.log(projectList);
      return res.status(200).send(projectList);
    }
  });
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

router.post("/projects/:userId", async (req, res) => {
  try {
    const {
      description,
      membersRequired,
      pings,
      field,
      interest,
      generationDate,
      lastApplyDate,
    } = req.body;

    if (!description || !membersRequired) {
      return res
        .status(422)
        .json({ error: "Please fill all the required fields" });
    }
    const { userId } = req.params;
    console.log(req.params);
    console.log(userId);
    const project = new Project(req.body);
    await User.findById(userId).exec(async (err, foundUser) => {
      if (err) {
        console.log(err, "From post porject");
      } else {
        await UserData.findById(foundUser.info).exec(
          async (err, foundUserData) => {
            if (err) {
              console.log(err, "From post Project ");
            } else {
              project.author.id = foundUser._id;
              project.author.userName =
                foundUser.firstName + " " + foundUser.lastName;
              // project.interest = foundUserData.interest;
              await project.save((err, savedProject) => {
                if (err) {
                  console.log(err, "From save Project");
                  return res
                    .status(400)
                    .json({ error: "Project is not posted from route js" });
                } else {
                  console.log(savedProject);
                  return res
                    .status(200)
                    .json({ message: "Project posted from route js" });
                }
              });
            }
          }
        );
      }
    });
  } catch (err) {
    console.log(err, "from catch route js");
  }
});

module.exports = router;
