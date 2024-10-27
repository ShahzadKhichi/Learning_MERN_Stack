const mongoose = require("mongoose");
const post = require("../Models/post.models")
const user = require("../Models/user.models")
const likeSchema = new mongoose.Schema({

    Post:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        require: true
    }
    ,
    User:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        require: true
    }
}, { timestamps: true })

const like = mongoose.model("like", likeSchema);
module.exports = like;