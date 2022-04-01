const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
  {
    author: {
      id: {
        // TODO  : add author's id here make one to many relationship :- object refrence.
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: {
        type: String,
      },
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    membersRequired: {
      type: String,
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    pings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    generationDate: {
      type: Date,
      required: true,
    },
    lastApplyDate: {
      type: Date,
      // INFO : add 7 days in the current date;
      default: +new Date() + 7 * 24 * 60 * 60 * 1000,
      required: true,
    },
    interest: {
      type: String,
      required: true,
    },
    field: {
      type: String,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
