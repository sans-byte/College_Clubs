const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserData = require("../models/userDataSchema");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  info: {
    // TODO : convert it into an array:object for more precise filtering.
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserData",
  },
  projects: {
    // TODO : add post id's : object refrence
    type: String,
    ref: "Project",
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// INFO : hash password before saving in database using pre save middleware

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// INFO : generating auth tokens

userSchema.methods.generateAuthToken = async function () {
  try {
    let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: generatedToken });
    await this.save();
    return generatedToken;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("User", userSchema);
