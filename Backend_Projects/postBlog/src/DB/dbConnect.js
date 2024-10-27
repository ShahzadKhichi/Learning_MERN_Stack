const mongoose = require("mongoose");
require('dotenv').config();
const dbConnect = async () => {
    await mongoose.connect(process.env.DATABASE_URL).then(() => {
        console.log("DB connectoin Successfull");
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    })
};

module.exports = dbConnect;