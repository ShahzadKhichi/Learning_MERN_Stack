const mongoose = require("mongoose");
const like = require("../Models/like.models")
const comment = require("../Models/comment.models")
const postSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    body:
    {
        type: String,
        required: true
    },
    user:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "like"
        }
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ],
}, { timestamps: true })

const post = mongoose.model("post", postSchema);
module.exports = post;