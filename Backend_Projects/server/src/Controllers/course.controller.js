const Course = require("../Models/course.model");
const Category = require("../Models/category.model");
const User = require("../Models/user.model");
const UploadImage = require("../utils/imageUploader");

//Create Course

const createCourse = async (req, res) => {
    try {
        //fetch all required data from request
        const { price, courseName, courseDescription, category, whatYouWillLearn } = req.body;
        const thumbnail = req.files.thumbnailImage;

        //validation

        if (!courseName || !category || !thumbnail || !courseDescription || !price || !whatYouWillLearn) {
            return res.status(401).json({
                success: false,
                message: "All fields are required",
                courseName,
                category,
                thumbnail,
                courseDescription,
                price
            })
        }

        //check for instructor

        const Instructor = await User.findById({ _id: req.User.id });
        if (!Instructor) {
            return res.status(401).json({
                success: false,
                message: "Instructor Not found",
            });
        }
        //TODO verify instructor id

        //check Category validation

        const CategoryDetails = await Category.findById(category);

        if (!CategoryDetails) {
            return res.status(401).json({
                success: false,
                message: "Category Not found",
            });
        }

        const thumbnailImage = await UploadImage(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            Instructor: Instructor._id,
            whatYouWillLearn,
            CategoryDetails,
            price,
            thumbnail: thumbnailImage.secure_url,

        });

        //updating User Schema
        await User.findByIdAndUpdate({ _id: Instructor._id }, {
            $push: {
                courses: newCourse._id,
            }
        }, { new: true });

        //updating Category Schema
        await Category.findByIdAndUpdate(category, {
            $push: {
                courses: newCourse._id,
            }
        }, { new: true });


        //sending response
        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        });
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Course Creating failed",
            error: error.message
        })

    }
}

//show all courses

const showAllCourses = async (req, res) => {
    try {

        //geting data from database
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true,
        }).populate("Instructor").exec();

        //sending response
        res.status(200).json({
            success: true,
            message: "All course Data returned Successfully",
            data: allCourses,
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Cannot fetch courses data",
        })
    }
}

const getCourseDetails = async (req, res) => {
    try {
        //get data from request
        const { courseId } = req.body;
        //validate
        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "Invalid course id"
            })
        };
        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "Instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate("Category")
            .exec();

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Could not find course details",
            })
        }

        //sending response
        res.status(200).json({
            success: false,
            message: "details fetched successfully",
            courseDetails,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to fetch course details",
            error: error.message
        })
    }
}
module.exports = { createCourse, showAllCourses, getCourseDetails };