const express = require("express");
const router = express.Router();
const {
  getUserInfoController,
  postUserInfoController,
} = require("../controller/authController");

router.get("/:id", getUserInfoController);
router.post("/:id", postUserInfoController);

module.exports = router;
