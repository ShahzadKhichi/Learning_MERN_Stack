const User = require("../Models/user.model");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");

const bcrypt = require("bcrypt");

//restPasswordToken

const restPasswordToken = async (req, res) => {
    try {

        //geting email from request body

        const { email } = req.body;



        const user = await User.findOne({ email });
        console.log(user);
        //Validating User 

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No User Found",
            })
        }

        //genrating token

        const token = crypto.randomUUID();

        const userUpdate = await User.findOneAndUpdate({ email }, {
            token: token,
            restPasswordExpires: Date.now() + 5 * 60 + 1000,
        }, { new: true });

        //creating URl

        const url = `http://localhost:300/update-password/${token}`;

        //sending mail with url

        await mailSender(email, "password Rest Link", `password Reset Link: ${url}`);

        //sending response 

        return res.status(200).json({
            success: true,
            message: "Password reset link is sent to your email .please check you email",
            url,
        }
        );


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Reset password token genration failed",
            error: error.message
        })

    }
}


//Reset Password

const resetPassword = async (req, res) => {

    try {

        //geting data from body

        const { password, confirmPassword, token } = req.body;

        //validation

        if (password != confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password not matching",
            })
        };

        // geting user details using token

        const userDetails = await User.findOne({ token });

        if (!userDetails) {
            return res.status(401).json({
                success: fasle,
                message: "Invalid Token",
            })
        }

        //checking token expires time

        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: fasle,
                message: "Token expired",
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update password

        const updatedUser = await User.findOneAndUpdate({ token }, { password: hashedPassword }, { new: true });


        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User Not found"
            })
        }
        //sending respose

        res.status(200).json({
            success: true,
            message: "password reset successfull",
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Reset password failed",
        })

    }
}

module.exports = { restPasswordToken, resetPassword };