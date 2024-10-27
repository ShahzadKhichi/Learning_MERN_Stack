const mongoose = require("mongoose");
const post = require("../Models/post.models");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    }]
}, { timestamps: true })

const user = mongoose.model("user", userSchema);
module.exports = user;