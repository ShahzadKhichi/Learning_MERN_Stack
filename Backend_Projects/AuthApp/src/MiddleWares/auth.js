const user = require("../Models/user.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req, res, next) => {
    try {
        let token = req.cookies.login || req.body.token;
        console.log(token);
        if (!token) {
            return res.status(401).json({ success: false, message: "Invalid token" })
        }
        else {
            try {
                token = jwt.verify(token, process.env.JWT_SECRET);

                if (!token || token == undefined) {
                    return res.status(500).json({
                        success: true,
                        message: "Unkown token found"
                    })
                }


            }
            catch (error) {
                return res.status(500).json({
                    success: true,
                    message: "Unkown token found"
                })
            }
        }
        next();

    } catch (error) {

        console.log(error);


        return res.status(401).json({ success: false, message: "Token verification failed" })
    }
}
const isStudent = async (req, res, next) => {
    try {
        let token = req.cookies.login || req.body.token;
        if (!token) {


            return res.status(401).json({ success: false, message: "Invalid token" })
        }
        else {
            token = jwt.verify(token, process.env.JWT_SECRET);

            if (token.role != "Student") {
                return res.status(500).json({
                    success: true,
                    message: "This path is only for Students"
                })
            }
        }
        next();
    } catch (error) {


        return res.status(401).json({ success: false, message: "Route transfer failed" })
    }
};

const isAdmin = async (req, res, next) => {
    try {
        let { token } = req.body;
        if (!token) {


            return res.status(401).json({ success: false, message: "Invalid token" })
        }
        else {
            try {


                token = jwt.verify(token, process.env.JWT_SECRET);

                if (token.role != "Admin") {
                    return res.status(500).json({
                        success: true,
                        message: "This path is only for Admins"
                    })
                }
            } catch (error) {
                return res.status(401).json({ success: false, message: "Invalid token" })
            }
        }
        next();
    } catch (error) {

        return res.status(401).json({ success: false, message: "Route transfer failed" })
    }
};

module.exports = { isAdmin, isStudent, auth };
