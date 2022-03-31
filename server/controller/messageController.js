const Chat = require("../models/chatSchema");
const Message = require("../models/messageSchema");
const User = require("../models/userDataSchema");

exports.sendMessageController = async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into the body");
    return res.status(400).json({ error: "Invalid data passed into the body" });
  }

  let newMessage = {
    sender: req.UserID,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);

    message = await message.populate("sender", "-tokens");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "firstName email",
    });
    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.allMessagesController = async (req, res) => {
  try {
    Message.find({ chat: req.params.chatId })
      .populate("sender", "-tokens")
      .populate("chat")
      .then(async (results) => {
        results = await User.populate(results, {
          path: "sender.info",
          select: "picture",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
