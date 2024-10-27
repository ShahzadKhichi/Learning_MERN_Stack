const { default: mongoose } = require("mongoose");
const Profile = require("../Models/profile.model");

const User = require("../Models/user.model");


//update profile
const updateProfile = async (req, res) => {
    try {
        //get data 
        const { DOB = "", contactNumber, gender, about = "" } = req.body;
        const userr = req.User;
        //validate data

        if (!DOB || !contactNumber || !gender || !about || !userr) {
            return res.status(401).json({
                success: false,
                message: "Are filed are required",
            });
        }
        //geting user
        const UserId = userr.id;
        const user = await User.findById(UserId);
        if (!user) {
            console.log('invalid user');

        }
        //geting profile id from user
        console.log(user);

        let profileId = user.additionalDetails;

        if (!profileId) {
            console.log('invalid user');

        }
        //update profile
        const updatedProfile = await Profile.findByIdAndUpdate(profileId, { gender, about, dateOfBirth: DOB, contactNumber }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Profile Updation failed",
            error: error.message
        });

    }
};

module.exports = { updateProfile }