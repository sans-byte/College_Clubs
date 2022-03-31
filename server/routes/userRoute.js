const express = require("express");
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const {
  registerController,
  activationController,
  loginController,
  logoutController,
  allUsersController,
} = require("../controller/authController");

//GET routes
router.get("/user", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/user/:id", Authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/find",Authenticate, allUsersController);

router.get("/logout", logoutController);

//POST routes

router.post("/register", registerController);
router.post("/activation", activationController);
router.post("/login", loginController);

module.exports = router;
