const mongoose = require("mongoose");

const coursesProgressSchema = new mongoose.Schema({
    courseId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    completedVideos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subSections"
    }]

}, { timestamps: true });

const coursesProgress = mongoose.model("coursesProgress", coursesProgressSchema);

module.exports = coursesProgress;