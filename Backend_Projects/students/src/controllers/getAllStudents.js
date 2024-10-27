const student = require("../models/student.models");

const getAll = async (req, res) => {
    try {
        const students = await student.find();
        //console.log(students);

        res.status(200).json({
            success: true,
            data: students,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            data: err,
            message: "error occured"

        })
    }
}
module.exports = getAll;