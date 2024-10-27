const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:
    {
        type: String,
        require: true,
        trim: true,
    },
    lastName:
    {
        type: String,
        require: true,
        trim: true
    },
    accountType: {
        type: String,
        enum: ["Admin", "Instructor", "Student"],
        require: true
    },
    email:
    {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    additionalDetails:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile",
        required: true,
    },
    courses:
        [{ type: mongoose.Schema.Types.ObjectId, ref: "courses", }]
    ,
    coursesProgress: [{ type: mongoose.Schema.Types.ObjectId, ref: "coursesProgress", }],

    image: {
        type: String,
        require: true,
    }



}, { timestamps: true });

const user = mongoose.model("user", userSchema);

module.exports = user;