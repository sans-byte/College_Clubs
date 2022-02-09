const mongoose = require("mongoose");

const interestSchema = mongoose.Schema({
  user: {
    // TODO : insert user's id at the time of creation :- object refrence.
    type: String,
    required: true,
  },
  interest: {
    // TODO : create array to filter more precisely
    type: String,
    required: true,
    default: "Programing",
  },
});

module.exports = mongoose.model("Interest", interestSchema);
