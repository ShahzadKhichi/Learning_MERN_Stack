const mongoose=require("mongoose");

const studentSchema= new mongoose.Schema({
    
    name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true
      },
    
    rollNo:{
        type:String,
        required:true
    }

},{timestamps:true});

 const students=mongoose.model("students",studentSchema);
 module.exports=students