const user = require("../Models/user.models");
const bcrypt = require("bcrypt");
const signUp = async (req, res) => {
    try {

        const { name, email, password, role } = req.body;
        const alreadyExist = await user.findOne({ email });
        if (alreadyExist) {
            return res.status(400).json({
                success: false,
                message: "emial already exists"
            })
        }
        let hashPass;
        try {
            hashPass = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "password hashing failed"
            })
        }

        const newUser = await user.create({ name, password: hashPass, email, role });
        res.status(200).json({
            success: true,
            data: newUser,
            message: "User created Successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "failed to create New User",
            err: error
        })
    }
};

module.exports = signUp;