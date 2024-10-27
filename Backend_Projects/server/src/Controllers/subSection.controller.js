const subSection = require("../Models/subSection.model");
const Section = require("../Models/section.model");
const uploadFile = require("../utils/imageUploader");

require("dotenv").config();

const createSubSection = async (req, res) => {
    try {
        //get from request
        const { sectionId, description, title, duration } = req.body;
        //geting video
        const video = req.files.video;
        //validion

        if (!video || !title || !description || !duration || !sectionId) {
            return res.status(401).json({
                success: false,
                message: "Invalid Data"
            })
        }
        //uploading to cloudinar

        const videoUrl = await uploadFile(video, process.env.FOLDER_NAME);

        //creating new section
        const newSubSection = await subSection.create({ title, duration, description, videoUrl });

        //updating id

        const updatedSection = await Section.findByIdAndUpdate({ sectionId }, {
            $push: {
                subSections: newSubSection._id,
            }
        });

        //sending response

        return res.status(200).json({
            success: true,
            message: "New sub Secton created Successfully",
        });



    } catch (error) {

        return res.status(500).json({
            success: false,
            message: ""
        })

    }
}

//update section

//delete section

module.exports = { createSubSection };