const file = require("../Models/file");
const cloudinary = require("../DB/cloudinary");
const fileUpload = async (req, res) => {
    try {
        const File = req.files.file;
        const email = req.body.email;
        let name = File.name;
        let path = __dirname + "/files/" + Date.now() + "." + File.name.split(".")[1];

        File.mv(path, function () {
            console.log("file saved in local storage");

        })

        const url = await cloudinary.uploader.upload(path, {
        }, () => {

            console.log("file uploaded to cloudinary");
        })
        const imageUrl = url.secure_url;
        const saved = new file({ name, email, imageUrl });
        await saved.save();
        res.status(200).json({
            success: true,
            message: "File uploaded Successfully",
            data: url.secure_url,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "File upload fail",


        })
    }
};


module.exports = fileUpload; 