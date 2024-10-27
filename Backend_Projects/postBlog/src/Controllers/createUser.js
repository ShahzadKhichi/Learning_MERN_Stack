const user = require("../Models/user.models");

const createUser = async (req, res) => {
    try {

        const { name } = req.body;
        const newUser = await user.create({ name });
        res.status(200).json({
            success: true,
            data: newUser,
            message: "user created successfully",
        })

    } catch (error) {

        res.status(500).json({
            success: false,

            message: "failed to create user",
        })
    }
}

module.exports = createUser;
