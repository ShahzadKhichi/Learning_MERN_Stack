const student = require("../models/student.models");

const deletId = async (req, res) => {
    try {
        const id = req.params.id;
        const doc = await student.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            data: "successfully Deleted"
        })
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
module.exports = deletId;