const { mongoose } = require("mongoose");
const { instance } = require("../DB/razorPay");
const crypto = require("crypto");
const Course = require("../Models/course.model");

const User = require("../Models/user.model");

const mailSender = require("../utils/mailSender");


const capturePayment = async (req, res) => {
    try {


        //getData

        const { courseId } = req.body;
        const userId = req.User.id;


        //validate
        if (!courseId || !userId) {
            return res.status(404).json({
                success: false,
                message: "Invalid user or course"
            });
        }

        let course = await Course.findById({ courseId });
        if (!course) {
            return res.status(404).json({
                success: fasle,
                message: "Invalid Course",
            })
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(401).json({
                success: fasle,
                message: "student already enrolled in this course",
            });
        }
        //create order
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId,
                userId,
            }
        };
        //creating order
        const paymentResponse = await instance.orders.create(options);
        //send response
        res.status(200).json({
            success: true,
            message: "Order placed successfull",
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
        });



    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Failed to buy course"
        });

    }
}

//verify Signature of RazorPay and Server

const verifySignature = async (req, res) => {
    try {

        const webhookSecret = "12345678";
        const signature = req.headers["x-razorpay-signature"];

        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.updae(JSON.stringify(req.body));

        const digest = shasum.digest("hex");

        if (signature !== digest) {
            return res.status(404).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const { courseId, userId } = req.body;

        await Course.findByIdAndUpdate({ courseId }, {
            $push: {
                studentsEnrolled: userId,
            }
        }, { new: true });

        await User.findByIdAndUpdate({ userId }, {
            $push: {
                courses: courseId,
            }
        }, { new: true });

        //sending mail to user success


        //sending response

        return res.status(200).json({
            success: true,
            message: "Enrolled in course successfully",
        })






    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "verification failed"
        })

    }
}

module.exports = { capturePayment, verifySignature };