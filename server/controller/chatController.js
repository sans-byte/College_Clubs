const Chat = require("../models/chatSchema");
const User = require("../models/userSchema");

exports.accessChatController = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      console.log("UserId Param is not sent with request");
      return res.status(400).json({ error: "UserId not provided" });
    }

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.UserID } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "firstName email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.UserID, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).send(fullChat);
      } catch (error) {
        res.status(400).json({ message: error.message });
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.fetchChatsController = async (req, res) => {
  try {
    Chat.find({ users: { $in: req.UserID } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "firstName email info",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    console.log(error.message);
  }
};
exports.createGroupChatController = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({
      message: "Please Fill All The Fields",
    });
  }
  let users = JSON.parse(req.body.users);
  users.push(req.UserID);
  if (users.length < 2) {
    return res.status(400).send("More then 2 users are required");
  }

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.rootUser,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate(
      "users",
      "-password"
    );
    res.status(200).send(fullGroupChat);
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};
exports.renameGroupController = async (req, res) => {
  try {
    const { chatId, chatName } = req.body;
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (updatedChat) {
      res.status(200).send(updatedChat);
    } else {
      res.status(400).json({ error: "Group rename failed" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log(error);
  }
};
exports.addToGroupController = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const addedUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (addedUser) {
      res.status(200).send(addedUser);
    } else {
      res.status(400).json({ error: "User Not added" });
    }
  } catch (error) {
    console.log(error);
  }
};
exports.removeFromGroupController = async (req, res) => {
  const { chatId, userId } = req.body;
  try {
    const removedUser = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (removedUser) {
      res.status(200).send(removedUser);
    } else {
      res.status(400).json({ error: "User Not removed" });
    }
  } catch (error) {
    console.log(error);
  }
};
