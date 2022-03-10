const express = require("express");
const {
  accessChatController,
  fetchChatsController,
  createGroupChatController,
  renameGroupController,
  removeFromGroupController,
  addToGroupController,
} = require("../controller/chatController");

const Authenticate = require("../middleware/authenticate");
const router = express.Router();

router.route("/").post(Authenticate, accessChatController);
router.route("/").get(Authenticate, fetchChatsController);
router.route("/group").post(Authenticate,createGroupChatController);
router.route("/rename").put(Authenticate,renameGroupController);
router.route("/groupadd").put(Authenticate,addToGroupController);
router.route("/groupremove").put(removeFromGroupController);

module.exports = router;
