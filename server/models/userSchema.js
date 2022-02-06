const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
  interests: {
    type: Object,
    required: true,
  },
});


//NOTE : hash password before saving in database using pre save middleware

userSchema.pre("save", async function(next){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password,12);
    this.confirmPassword = await bcrypt.hash(this.confirmPassword,12);
  }
  next();
});

module.exports = mongoose.model("User", userSchema);