const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        rquired: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    }
});

async function sendVerficationMial(email, otp) {


    try {
        const mailResponse = await mailSender(email, "Verificaion OTP", otp);
        console.log(mailResponse);

    } catch (error) {
        console.
            log("email sent failed : error", error);
        throw error;

    }


}

otpSchema.pre("save", async (next) => {
    await sendVerficationMial(this.email, this.otp);
    next();
})

const otp = mongoose.model("otp", otpSchema);

module.exports = otp;