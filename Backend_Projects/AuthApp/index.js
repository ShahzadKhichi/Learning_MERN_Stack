const express = require("express");
const dbConnect = require("./src/DB/dbConnect");
const router = require("./src/Routes/routes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());
app.use(express.json());
require("dotenv").config();
app.use(router)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})
dbConnect();