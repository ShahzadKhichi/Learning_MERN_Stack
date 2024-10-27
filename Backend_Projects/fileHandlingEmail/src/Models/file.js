const mongoose = require("mongoose");
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    imageUrl:
    {
        type: String
    }
    ,
    email:
    {
        type: String,
    },
}, { timestamps: true });

fileSchema.post("save", async (doc) => {
    console.log(doc);
    const transpoter = require("../DB/transporter");

    const info = await transpoter.sendMail({
        from: "Shahzad : ",
        to: doc.email,
        subject: "Your file is uploaded on cloudinary",
        html: `<h1>File Uploaded Successfully </h1> <br> view your file at this URL : ${doc.imageUrl}`
    }).then(() => {
        console.log("Mail sent successfully");
    })

})

const file = mongoose.model("file", fileSchema);

module.exports = file;