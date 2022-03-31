const mongoose = require("mongoose");

const userDataSchema = mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        requried: true,
        ref: "User",
      },
    },
    gender: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    picture: {
      type: String,
    },
    interest: {
      type: String,
    },
    college: {
      type: String,
    },
    website: {
      type: String,
    },
    linkdln: {
      type: String,
    },
    github: {
      type: String,
    },
    // resume: {
    //   data: Buffer,
    //   contentType: String,
    // },

    resume: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserData", userDataSchema);
