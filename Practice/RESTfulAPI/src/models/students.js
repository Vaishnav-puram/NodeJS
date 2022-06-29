const mongoose = require("mongoose");
const validator = require("validator");

//*****************SCHEMA*********************
const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [2, "minimum 2 letters required"],
            maxlength: 30
        },
        age: {
            type: Number,
            required: true,
            validate(value) { //custom validation
                if (value <= 0) {
                    throw new Error("age shouldn't be negative!!!")
                }
            }
        },
        rollno: {
            type: Number
        },
        email: {
            type: String,
            validate(value) { //validation through validator 
                if (!validator.isEmail(value)) {
                    throw new Error("not a valid email format!!!!!")
                }
            },
            unique: [true, "email is already present!!!!"]
        },
        phone: {
            type: Number,
            unique: true,
            required: true
        },
        address:{
            type:String,
            required:true
        }
    }
);

//*************MODEL -- Collection creation**********************
const Student=new mongoose.model("Student",studentSchema);

module.exports=Student;

const createDoc=async()=>{
    try{

    }
    catch(err){
        console.log("error in creation....")
    }
}
