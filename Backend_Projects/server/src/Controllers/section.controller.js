const Section = require("../Models/section.model");
const Course = require("../Models/course.model");

const createSection = async (req, res) => {
    try {
        //fetching data from request

        const { sectionName, courseId } = req.body;

        //validating data
        if (!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "All field are required",
            })
        }

        //creating new Section

        const newSection = await Section.create({ sectionName });

        //updating course with Section ID

        const UpdatedCourse = await Course.findByIdAndUpdate(courseId, {
            $push: {
                courseContent: newSection._id,
            }
        }, { new: true });

        //sending response
        return res.status(200).json({
            success: false,
            message: "New section Added Sucessfully",
            data: UpdatedCourse,
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "New section Creation Failed",
            error: error.message,
        })

    }
}

const updateSection = async (req, res) => {
    try {
        //fetching data
        const { sectionName, sectionId } = req.body;
        //validating data
        if (!sectionName || !sectionId) {
            return res.status(401).json({
                success: false,
                message: "All field are required",
            })
        };
        //updating section
        const updatedSection = await Section.findByIdAndUpdate(sectionId, { sectionName }, { new: true });

        //sending response

        return res.status(200).json({
            success: false,
            message: "Section Updated Successfully",
            data: updatedSection,
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "section Updation failed",
        })
    }
}

const deleteSection = async (req, res) => {
    try {
        //geting data 
        const { sectionId, courseId } = req.body;

        //validating data 

        if (!sectionId || !courseId) {
            return res.status(401).json({
                success: false,
                message: "Invalid Section ID or course ID",
            })
        }

        //deleting section
        await Section.findByIdAndDelete(sectionId);
        //updating Course
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            },
        });
        //sending response
        return res.status(200).json({
            success: false,
            message: "Section Deleted Successfully",
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Section Deletion failed",
            error: error.message
        })

    }
}

module.exports = { createSection, updateSection, deleteSection };