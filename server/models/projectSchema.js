const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  author: {
    id: {
    // TODO  : add author's id here make one to many relationship :- object refrence.
      type: Number,
      ref: "User",
    },
    userName: {
      type: String,
      required: true,
    },
  },
  description: {
    type: String,
    required: true,
  },
  membersRequired: {
    type: Number,
    required: true,
  },
  pings: {
    type: Number,
    required: true,
  },
  generationDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  lastApplyDate: {
    type: Date,
    // INFO : add 7 days in the current date;
    default: +new Date() + 7*24*60*60*1000,
    required: true,
  },
  likes : {
      type:Number,
      default:0,
  },
  comment:[
      {
          // TODO : add comment id 
          type:String,
          ref:"Comment",
      }
  ]
});

module.exports = mongoose.model("Project", projectSchema);
