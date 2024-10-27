const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    }],
    description: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const category = mongoose.model("category", categorySchema);

module.exports = category;