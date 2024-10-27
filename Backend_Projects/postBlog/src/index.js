const express = require("express");
const dbConnect = require("./DB/dbConnect");
const router = require("./Routes/routes");

const app = express();



app.use(express.json());
require('dotenv').config();
const PORT = process.env.PORT || 5000;
console.log();

app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
})
dbConnect();
app.use(router);

