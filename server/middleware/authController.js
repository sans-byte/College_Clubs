const User = require("../models/userSchema");
const UserData = require("../models/userDataSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const formidable = require("formidable");
const fs = require("fs");

// info : transporter function to send email
const createTransporter = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
  const accessToken = await new Promise((resolve, reject) => {
    oAuth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "sanskarj15@gmail.com",
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      accessToken: accessToken,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });
  return transporter;
};

const sendmail = async (mailOptions) => {
  try {
    let emailTransporter = await createTransporter();
    const result = await emailTransporter.sendMail(mailOptions);
    return result;
  } catch (err) {
    console.log(err);
  }
};

// info : middleware to control registration and verification of email
exports.registerController = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = { firstName, lastName, email, password };

  if (!firstName || !lastName || !email || !password) {
    return res.status(422).json({ error: "Please provide all the fields" });
  }

  // info : Validation if user already exist
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(422).json({ error: "User already exist" });
  } else {
    //generating token
    const token = jwt.sign({ newUser }, process.env.SECRET_KEY, {
      expiresIn: "15m",
    });
    const mailOptions = {
      from: "No-reply",
      // TODO : change this to user email;
      to: "sameersanskarj15@gmail.com",
      subject: "Email Verification",
      html: `
        <h2>Please click on this link to verify your email</h2>
        <a>http://localhost:3000/user/activation/${token}</a>
    `,
    };
    // send mail for Verification
    sendmail(mailOptions)
      .then((result) => {
        console.log(result, "This is from sendmail function success");
      })
      .catch((err) => {
        console.log(err.message, "This is from sendmail function reject");
      });
    return res
      .status(200)
      .json({ message: "Verify email send to your email address" });
  }
};

// info : controller for activation of user account after sending email
exports.activationController = async (req, res) => {
  const { token } = req.body;
  console.log(token);
  if (token) {
    //verify token is valid or not
    jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken) => {
      if (err) {
        console.log(err, "From jwt verify token");
        return res.status(422).json({ error: "Token Expired" });
      } else {
        try {
          // console.log(decodedToken);
          // get name email password from token
          const { newUser } = decodedToken;
          // console.log(newUser);
          // info : creating user and saving in database
          const user = new User(newUser);
          const userExist = await User.findOne({ email: newUser.email });
          if (userExist) {
            return res.status(422).json({ message: "user already exist" });
          }
          await user.save();
          return res.status(201).json({ message: "Success" });
        } catch (err) {
          //   console.log(err, "FROM catch block of activationController");
          res.status(422).json({ message: "Something went wrong" });
        }
      }
    });
  } else {
    res.status(422).json({ message: "Error getting token" });
  }
};

// info : controller for taking user information and add it to the database
exports.userInfoController = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, file) => {
    if (fields) {
      const { gender, date_of_birth, interest } = fields;
      if (!gender || !date_of_birth || !interest) {
        res.status(422).json("please fill required fields");
      }
    }
    // console.log(file);

    if (file.resume && file.picture) {
      const userData = new UserData(fields);
      // info : saving user id into the user data
      const id = req.params.id;
      userData.user.id = id;
      userData.picture.data = fs.readFileSync(file.picture.filepath);
      userData.picture.contentType = file.picture.type;
      userData.resume.data = fs.readFileSync(file.resume.filepath);
      userData.resume.contentType = file.resume.type;

      await userData.save(async (err, userData) => {
        if (err) {
          return res.json({
            error: "not save in database",
          });
        }
        await User.findById(id).exec(async (err, user) => {
          if (err) {
            console.log("this is from userData .save");
            console.log(err);
          } else {
            user.info = userData;
            await user.save();
            // await user.populate("info").then((user) => {
            //   console.log(user);
            // });
            // await User.findById(id)
            //   .populate("info")
            //   .exec((err, data) => {
            //     console.log(data);
            //   });
            return res.status(200).json(userData);
          }
        });
      });
    }
  });
};
