const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    courseDescription: {
        type: String,
        require: true,
    },
    Instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    studentsEnrolled: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    whatYouWillLearn: {
        type: String,
        required: true,
    },
    courseContent: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "section",
    }],
    thumbnail:
    {
        type: String,
    },
    Category:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",

    },
    ratingAndReviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ratingAndReview",
    }],
    price: {
        type: Number,
    }
}, { timestamps: true });

const course = mongoose.model("course", courseSchema);
module.exports = course;