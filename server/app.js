const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const User = require("./models/userSchema");
const userRoute = require("./routes/userRoute");
const projectsRoute = require("./routes/projectsRoute");
const userInfoRoutes = require("./routes/userInfoRoutes.js");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config({ path: "./config.env" });
require("./database/connection.js");

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload()); // note : this was stopping formidable parse to run
app.use(userRoute);
app.use("/projects", projectsRoute);
app.use("/userinfo", userInfoRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
const server = app.listen(
  process.env.PORT,
  console.log(`Connection successfull at ${process.env.PORT}`)
);

console.log("hi");

const io = require("socket.io")(server, {
  pingTimeout: 600000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket io");
  socket.on("setup", (userData) => {
    socket.join(userData);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room:" + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("chat.users not defined");
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender_id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData);
    });
  });
});
