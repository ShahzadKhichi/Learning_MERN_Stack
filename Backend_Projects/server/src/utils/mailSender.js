const transpoter = require("../DB/transpoter");
require("dotenv").config();
const mailSender = async (email, subject, body) => {

    try {
        let info = await transpoter.sendMail({
            from: "Study Notion",
            to: email,
            subject,
            html: body,
        })
        return info
    }
    catch (err) {
        console.log(err.message);
    }
}
module.exports = mailSender;
