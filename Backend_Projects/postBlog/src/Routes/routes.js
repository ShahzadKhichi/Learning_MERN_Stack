const express = require("express");

const router = express.Router();

const createUser = require("../Controllers/createUser");
const createPost = require("../Controllers/createPost");
const likeIt = require("../Controllers/like");
const unlikeIt = require("../Controllers/unlike");
const comment = require("../Controllers/comment");


router.post("/createUser", createUser)
router.post("/createPost", createPost)
router.post("/likeIt", likeIt);
router.post("/unLikeIt", unlikeIt);
router.post("/comment", comment);

module.exports = router;