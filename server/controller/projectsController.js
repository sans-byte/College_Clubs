const Project = require("../models/projectSchema");
const User = require("../models/userSchema");
const UserData = require("../models/userDataSchema");
const {
  findOneAndUpdate,
  findByIdAndUpdate,
} = require("../models/userDataSchema");

exports.getProjects = async (req, res) => {
  const { interest } = req.params;
  try {
    await Project.find({ interest }).populate("pings").exec((err, projectList) => {
      if (err) {
        console.log(err, "from get projects");
        return res
          .status(400)
          .json({ error: "Something went wrong in route.js get projects" });
      } else {
        return res.status(200).send(projectList);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getMyProject = async (req, res) => {
  try {
    await Project.find({ "author.id": req.UserID }).exec((err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json("Error in finding my projects");
      } else {
        res.status(200).send(result);
      }
    });
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
};

exports.pingProject = async (req, res) => {
  const { projectId} = req.body;
  console.log(projectId);
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      {
        $push: { pings: req.UserID },
      },
      {
        new: true,
      }
    ).populate("pings");
    if (updatedProject) {
      res.status(200).send(updatedProject);
    } else {
      res.status(400).json("ping failed");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postProject = async (req, res) => {
  const date = new Date();
  try {
    const {
      title,
      description,
      membersRequired,
      pings,
      field,
      interest,
      generationDate,
      lastApplyDate,
    } = req.body;
    if (!title || !description || !membersRequired) {
      return res
        .status(422)
        .json({ error: "Please fill all the required fields" });
    }
    const { userId } = req.params;
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
              project.generationDate = date;
              project.author.id = foundUser._id;
              project.author.userName =
                foundUser.firstName + " " + foundUser.lastName;
              project.interest = foundUserData.interest;
              await project.save((err, savedProject) => {
                if (err) {
                  console.log(err, "From save Project");
                  return res
                    .status(400)
                    .json({ error: "Project is not posted from route js" });
                } else {
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
};
