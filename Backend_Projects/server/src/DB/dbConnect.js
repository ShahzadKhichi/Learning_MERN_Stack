const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {

    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("DB connection sucessfull")
    })
        .catch()
    {
        console.log("DB connectoin failed");

    }
}

module.exports = dbConnect;