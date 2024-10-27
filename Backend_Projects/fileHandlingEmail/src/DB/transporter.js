const nodemailer = require("nodemailer");
require("dotenv").config();

const transpoter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

module.exports = transpoter;