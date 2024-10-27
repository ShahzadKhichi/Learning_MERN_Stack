const ratingAndReview = require("../Models/ratingAndReview.model");
const Course = require("../Models/course.model");

const createRating = async (req, res) => {
    try {
        //get data from request
        const { review, courseId, rating } = req.body;
        const userId = req.User.id;

        //validate data
        if (!userId || !rating || !review || !courseId) {
            return res.status(404).json({
                success: false,
                message: "all field are required"
            })
        }


        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $elemMatch: { $eq: userId } },
        });
        if (!courseDetails) {
            return res.status(401).json({
                success: false,
                message: "Student Not enrolled in this course",
            })
        }
        //check if user already reviewed

        const alreadReviewed = await ratingAndReview.findone({
            user: userId,
            course: courseId,
        })
        if (alreadReviewed) {
            return res.status(404).json({
                success: false,
                message: "User already reviewed this course"
            })
        }
        //create rating and Review

        const ratingReview = await ratingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });
        //updating course 
        await Course.findByIdAndUpdate({ courseId }, {
            $push: {
                ratingAndReviews: ratingReview._id,
            }
        }, { new: true });

        res.status(200).json({

            success: true,
            message: "Review added successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to add review"
        })

    }
}

const getAvergeRating = async (req, res) => {
    try {
        //get data from request
        const { courseId } = req.body;

        //validate data
        if (!courseId) {
            return res.status(404).json({
                success: false,
                message: "Invalid Course Id"
            })
        }
        const courseDetails = await Course.findById({ courseId }).populate("ratingAndReviews").exec();
        if (!courseDetails.ratingAndReviews.length) {
            return res.status(200).json({
                success: true,
                message: "avg calculated successfully",
                averageRating: 0
            });
        }
        const reviewSum = courseDetails.ratingAndReviews.reduce((acc, review) => {
            acc += review.review;
        }, 0);


        return res.status(200).json({
            success: true,
            message: "rating avg calculated successfully",
            averageRating: reviewSum / courseDetails.ratingAndReviews.length,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to get average rating"
        })

    }
}
const getAllRating = async (req, res) => {
    try {
        //get data 
        const allReviews = await ratingAndReview.find({}).populate({
            path: "user",
            seletc: "fristName lastName email image",
        })
            .populate({
                path: "course",
                select: "courseName",
            }).exec();
        return res.status(200).json({
            success: true,
            message: "All rating fetched successfully",
            data: allReviews
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "failed to get all ratings"
        })
    }
}
module.exports = { createRating, getAvergeRating, getAllRating }

