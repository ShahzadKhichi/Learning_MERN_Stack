const user = require("../Models/user.model");
const jwt = require("jsonwebtoken");

require("dotenv").config();
//auth
const auth = async (req, res, next) => {
    try {
        const { User } = req.body;
        const { token } = req.cookies || req.body || req.header("Authorization").replace("Bearer", " ");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not Found",
            })
        }

        try {
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);



            req.User = verifiedToken;


        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            })
        }





        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "authentication  failed",
        })
    }
}
//isStudent

const isStudent = async (req, res, next) => {
    try {

        const User = req.User;

        if (!User) {
            return res.status(401).json({
                success: false,
                message: "Authorization  error",
            })
        }

        if (User.accountType != "Student") {
            return res.status(403).json({
                success: false,
                message: "This is path is protected only for students",
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Athorizatoin failed",
        })
    }
}
//isInstructor
const isInstructor = async (req, res, next) => {
    try {

        const User = req.User;

        if (!User) {
            return res.status(401).json({
                success: false,
                message: "Authorization  error",
            })
        }

        if (User.accountType != "Instructor") {
            return res.status(403).json({
                success: false,
                message: "This is path is protected only for Instructor",
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Athorizatoin failed",
        })
    }
}
//isAdmin

const isAdmin = async (req, res, next) => {
    try {

        const User = req.User;

        if (!User) {
            return res.status(401).json({
                success: false,
                message: "Authorization  error",
            })
        }

        if (User.accountType != "Admin") {
            return res.status(403).json({
                success: false,
                message: "This is path is protected only for Admin",
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Athorizatoin failed",
        })
    }
}

module.exports = { auth, isAdmin, isInstructor, isStudent };
