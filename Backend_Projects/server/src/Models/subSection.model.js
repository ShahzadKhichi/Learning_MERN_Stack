const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    duration:
    {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    description: {
        type: String,
    }
}, { timestamps: true })

const subSection = mongoose.model("subSection", subSectionSchema);

module.exports = subSection;