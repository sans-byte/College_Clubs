const express = require("express");
const { sendMessageController, allMessagesController } = require("../controller/messageController");
const Authenticate = require("../middleware/authenticate");

const router = express.Router();

//send a message
router.route("/").post(Authenticate, sendMessageController);

//fetch all the messages in the perticular route
router.route("/:chatId").get(Authenticate,allMessagesController);

module.exports = router;
