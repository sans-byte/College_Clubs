const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const User = require("./models/userSchema");
const route = require("./routes/route");

dotenv.config({ path: "./config.env" });
require("./database/connection.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload()); // note : this was stopping formidable parse to run
app.use(route);

app.listen(
  process.env.PORT,
  console.log(`Connection successfull at ${process.env.PORT}`)
);
