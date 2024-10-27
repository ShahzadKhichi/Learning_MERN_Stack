const mongoose = require("mongoose");
const post = require("../Models/post.models");
const user = require("../Models/user.models");

const commentSchema = new mongoose.Schema({
    body:
    {
        type: String,
        require: true
    },
    post:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    },
    user:
    {

        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, { timestamps: true });
const comment = mongoose.model("comment", commentSchema);
module.exports = comment;