const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    subSections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "subSection",
        required: true,
    }]
}, { timestamps: true })

const section = mongoose.model("section", sectionSchema);

module.exports = section;