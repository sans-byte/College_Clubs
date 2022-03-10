const express = require("express");
const router = express.Router();
const { getProjects, postProject } = require("../controller/projectsController");


module.exports = router;

router.get("/:interest", getProjects);

router.post("/:userId", postProject);
