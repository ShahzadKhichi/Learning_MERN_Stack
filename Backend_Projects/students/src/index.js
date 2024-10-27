const express=require("express");
const dbConnect=require("./db/dbConnect")
const router=require("./routes/routes");
const app=express();
require("dotenv").config();
port=process.env.PORT||5000;
app.use(express.json());



app.listen(port,()=>{console.log(`server started at port ${port}`);
})
dbConnect();
app.use(router);