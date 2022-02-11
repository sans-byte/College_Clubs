const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;
    console.log(token);
    const verifyToken = jwt.verify(
      token,
      process.env.SECRET_KEY
    );
    console.log(verifyToken);
    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.UserID = rootUser._id;
    console.log("done here", req.rootUser);
    next();
  } catch (err) {
    res.status(401).send("Unauthorized:NO token Provided");
    console.log(err);
  }
};

module.exports = authenticate;
