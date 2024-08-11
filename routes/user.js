const express = require("express");

const {
    handleLoginUser,
    handleRegisterUser,
    handleAddPost
} = require("../controllers/user");
const { handleAddComment } = require("../controllers/post");


const router = express.Router();

router.get("/login", handleLoginUser);

router.post("/register", handleRegisterUser);

router.post("/post", handleAddPost);

router.patch("/comment", handleAddComment);

module.exports = router;


