const student = require("../models/student.models");

 const createStudent=async (req,res)=>{
    try{
        const {name,age,rollNo}=req.body;
    const students=student.create({name,age,rollNo});
    res.status(200).json(
        {
            success:true,
            data:req.body,
            message:"student added successfully",
        }
    )
     }
    catch(err)
    {
        console.log(err);
        
    res.status(500).json({
        success:false,
        data:err,
        message:"error occured"

    })
    }
    }
    module.exports=createStudent;