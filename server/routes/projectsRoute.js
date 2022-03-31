const express = require("express");
const router = express.Router();
const Authenticate = require("../middleware/authenticate");
const {
  getProjects,
  postProject,
  getMyProject,
} = require("../controller/projectsController");

router.get("/myprojects", Authenticate, getMyProject);
router.get("/:interest", getProjects);
router.post("/:userId", postProject);

module.exports = router;
