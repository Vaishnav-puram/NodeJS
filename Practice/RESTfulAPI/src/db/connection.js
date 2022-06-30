const mongoose=require("mongoose");

//creates a Collection--students-api
mongoose.connect("mongodb://localhost:27017/students-api",)
    .then(()=>console.log("connection established....")).catch((err)=>{console.log("error in connecting the db")})

