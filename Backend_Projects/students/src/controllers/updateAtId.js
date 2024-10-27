const student = require("../models/student.models");

const updateId = async (req, res) => {
    try {
        const { name, age, rollNo } = req.body;
        const id = req.params.id;
        //console.log(`id : ${id} \n name : ${name}`);
        const filter = { _id: id };
        const update = {
            name: req.body.name,
            age: req.body.age,
            rollNo: req.body.rollNo
        }
        await student.findOneAndUpdate(filter, update);
        res.status(200).json({
            success: true,
            data: "success full updated"
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
module.exports = updateId;