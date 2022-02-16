const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/college_clubbing";
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });
