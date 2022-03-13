const User = require("../models/userSchema");
const UserData = require("../models/userDataSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const formidable = require("formidable");
const fs = require("fs");
const bcrypt = require("bcryptjs");

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
exports.postUserInfoController = async (req, res) => {
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

exports.getUserInfoController = async (req, res) => {
  const id = req.params.id;
  await User.findById(id).exec(async (err, foundUser) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: "Something is wrong in route.js " });
    } else {
      if (!foundUser.info) {
        return res
          .status(400)
          .json({ message: "Everything is fine till now from route.js" });
      } else {
        const userDataId = foundUser.info._id;
        await UserData.findById(userDataId).exec(async (err, foundData) => {
          if (err) {
            console.log(err);
            return res
              .status(400)
              .json({ error: "No userData found in route.js " });
          } else {
            if (!foundData) {
              return res
                .status(400)
                .json({ error: "No userData found in route.js " });
            } else {
              return res.status(200).send(foundData);
            }
          }
        });
      }
    }
  });
};

// info : controller for login the user
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Fill all the fields" });
    }

    // INFO : finding user and checking for credentials
    const userLogin = await User.findOne({ email }).populate("info");

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (isMatch) {
        return res.status(200).send(userLogin);
      } else {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    } else {
      return res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err, "from catch");
  }
};

exports.logoutController = async (req, res) => {
  try {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("User Logout");
  } catch (error) {
    console.log(error);
  }
};

exports.allUsersController = async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { firstName: { $regex: req.query.search, $options: "i" } },
            // { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
    // it will return users exept the currently logged in user
    // we have to use it later when we will use authenticate middleware here
    // const users = await (await User.find(keyword)).find({_id:{$ne:req.user._id}});
    const users = await User.find(keyword).populate("info");
    if (users) {
      res.status(200).send(users);
      console.log(keyword);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};
