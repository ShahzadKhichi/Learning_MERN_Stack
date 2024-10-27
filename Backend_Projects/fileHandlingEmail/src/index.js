const express = require("express");
const app = express();
const dbConnect = require("../src/DB/dbConnect");
const router = require("./Routes/routes");
const fileUploader = require("express-fileupload");
require("dotenv").config();

app.use(express.json());

app.use(fileUploader({
    tempFilePath: "/files/",
    tempFilePath: true
}));

app.use(router);
app.listen(process.env.PORT, () => {

    console.log(`Server is Runnig at port ${process.env.PORT}`);

});

dbConnect();

