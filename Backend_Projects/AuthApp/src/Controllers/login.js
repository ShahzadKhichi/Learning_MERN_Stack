const user = require("../Models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const login = async (req, res) => {
    try {
        console.log("here");

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(402).json({
                success: false,
                message: "Please fill information carefully"
            })
        }
        let member = await user.findOne({ email });
        if (!member) {
            return res.status(402).json({
                success: false,
                message: "User not Register"
            })
        }

        const match = await bcrypt.compare(password, member.password);
        console.log(match);

        if (match) {

            const playload = {
                email,
                password,
                role: member.role
            };

            const token = jwt.sign(playload, process.env.JWT_SECRET);
            member = member.toObject();
            member.password = undefined;
            member.token = token;
            console.log(token);
            const options = {
                httponly: true
            }
            return res.cookie("login", token, options).status(200).json({
                success: true,
                data: member,
                token,
                message: "Login successfully"
            })
        }
        else {
            return res.status(402).json({
                success: false,
                message: "wrong password"
            })
        }

    } catch (error) {
        return res.status(402).json({
            success: false,
            message: "Failed to login"
        })
    }
}
module.exports = login;