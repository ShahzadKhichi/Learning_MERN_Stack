const mongoose =require("mongoose");

require("dotenv").config();

 const dbConnect= ()=>{mongoose.connect("mongodb://localhost:27017/khan").then(()=>{console.log("DB Connection Succesfull ");
}).catch((err)=>{console.error(err)
    process.exit(1);
});
 }

module.exports=dbConnect;
