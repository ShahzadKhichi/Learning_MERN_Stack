const cloudinary = require("../DB/cloudinary");

const UploadImage = async (file, folder, height, quality) => {
    try {
        const options = { folder };
        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }

        options.resource_type = "auto";

        return await cloudinary.uploader.upload(file.tempFilePath, options);

    } catch (error) {

        return `error: ${error.message}`;

    }
}
module.exports = UploadImage;