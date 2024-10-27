const user = require("../Models/user.model");
const otp = require("../Models/otp.model");
const otpGenrator = require("otp-generator");

const bcrypt = require("bcrypt");
const Profile = require("../Models/profile.model");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")

//sendOTP

const sendOTP = async (req, res) => {
    try {
        //geting data from request body
        const { email } = req.body;
        //verifying for already existing user
        const alreadyExist = await user.findOne({ email });

        if (alreadyExist) {
            res.status(500).json({
                success: false,
                message: "User already register",
            })
        }
        //genrating otp
        const result = otpGenrator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })

        //saving otp in database
        const newOTP = new otp({ email, otp: result });


        const savedOTP = await newOTP.save();

        const mailSent = await mailSender(email, "Your Verification otp is : ", result)
        //sending response

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            data: newOTP,
            mailSent

        })

    } catch (error) {
        //handling errors
        res.status(400).json({
            success: false,
            message: error.message,
        })

    }
}

//sign up

const signUp = async (req, res) => {
    try {

        //Getting data from request body
        const {
            email,
            firstName,
            lastName,
            password,
            OTP,
            accountType,

        } = req.body;

        //checking all fields 

        if (!email || !firstName || !lastName || !password || !OTP || !accountType) {
            return res.status(403).json({
                success: false,
                message: "Please fill all field carefully",
            });
        }

        //checking for already existing user

        const checkAlready = await user.findOne({ email });

        if (checkAlready) {
            return res.status(403).json({
                success: false,
                message: "User already registered",
                checkAlready,
            })
        };

        //verifying otp

        let recentOTP = await otp.find({ email }).sort({ createdAt: -1 }).limit(1);

        if (!recentOTP || !recentOTP.length) {
            return res.status(403).json({
                success: false,
                message: "OTP Not Found ",
            })
        }


        recentOTP = recentOTP[0].otp;
        if (recentOTP != OTP) {
            return res.status(403).json({
                success: false,
                message: "Invalid OTP",
                recentOTP,
                OTP,

            })
        }

        //hashing password

        const hashedPassword = await bcrypt.hash(password, 10);

        //creating profile

        const profile = await Profile.create({
            gender: null,
            about: null,
            dateOfBirth: null,
            contactNumber: null,
        });

        // const image=dice bear site api for name pic

        //creating new User

        const newUser = new user({ email, firstName, lastName, password: hashedPassword, accountType, additionalDetails: profile._id, image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}` });

        // //saving new User
        const savedUser = await newUser.save();

        //send response
        res.status(200).json({
            success: true,
            message: "SignUp Successfully",

        })

    } catch (error) {
        //handling errors
        res.status(500).json({
            success: false,
            message: "SignUp failed ",
            error: error.message
        })
    }
}
//login

const logIn = async (req, res) => {
    try {

        //getting data from request body

        const { email, password } = req.body;

        //find user in database

        const findUser = await user.findOne({ email });


        //checking for vaild user

        if (!findUser) {
            return res.status(401).json({
                success: false,
                message: "Account Does not exist",
            })
        }
        const { accountType } = findUser;
        //checking for vaild password

        const check = await bcrypt.compare(password, findUser.password);

        if (!check) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            })
        }

        //creating token

        const playLoad = {
            email,
            id: findUser._id,
            accountType,
            user: findUser,
        };

        const token = jwt.sign(playLoad, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        //adding token in user

        findUser.token = token;
        findUser.password = undefined;

        req.User = findUser;
        //creating cookie and its option 

        const options = {
            httpOnly: true,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        }

        //sending response to friend
        res.cookie("token", token, options).status(200).json({
            success: true,
            password,

            message: "Login Succesfully",
            token,
            user: findUser,
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Login failed",
            error: error.message,
        }
        )

    }

}

const deleteAccount = async (req, res) => {
    try {
        //geting data
        const UserId = req.User.id;

        const User = await user.findById({ UserId });

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "Invalid User details",
            })
        }

        await Profile.findByIdAndDelete({ _id: user.additionalDetails });

        //Also update courses 

        if (User.accountType == "Student") {
            const courses = User.courses;

            courses.forEach(async (course) => {
                const courseDetails = await course.findByIdAndDelete({ course }, {
                    $pull: {
                        studentsEnrolled: UserId,
                    }
                }, { new: true });

            });
        }

        await user.findByIdAndDelete({ UserId });

        //sending response

        return res.status(200).json({
            success: true,
            message: "Account Deleted Successfully",
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Account Deletion Failed",
            error: error.message
        })

    }
};
//changePassword


module.exports = { signUp, logIn, sendOTP, deleteAccount };