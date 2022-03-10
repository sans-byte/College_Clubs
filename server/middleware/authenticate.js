const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    // console.log(token, "This is from here");
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    }).populate("info");

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.UserID = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send("Unauthorized:NO token Provided");
    console.log(err);
  }
};

module.exports = authenticate;
