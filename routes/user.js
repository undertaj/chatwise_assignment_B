const express = require("express");

const {
  handleLoginUser,
  handleRegisterUser,
  handleAddPost,
} = require("../controllers/user");
const { handleAddComment } = require("../controllers/post");
const {
  handleSendFriendRequest,
  handleAcceptFriendRequest,
} = require("../controllers/friend_request");

const router = express.Router();

router.get("/login", handleLoginUser);

router.post("/register", handleRegisterUser);

router.post("/post", handleAddPost);

router.patch("/comment/:id", handleAddComment);

router.get("/send_request/:id", handleSendFriendRequest);

router.get("/accept_request/:id", handleAcceptFriendRequest);

module.exports = router;
