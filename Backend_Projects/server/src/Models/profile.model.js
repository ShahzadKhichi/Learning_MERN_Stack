const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:
    {
        type: String,
        trim: true
    },
    dateOfBirth:
    {
        type: String,
        trim: true
    },
    about:
    {
        type: String,
        trim: true
    },
    contactNumber:
    {
        type: String,
        trim: true
    }
}, { timestamps: true });

const profile = mongoose.model("profile", profileSchema);
module.exports = profile;