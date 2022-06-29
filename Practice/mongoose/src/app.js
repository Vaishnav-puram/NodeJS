const mongoose=require("mongoose");
const validator=require("validator");

//connection creation and creation of new database if you provide a new name other than the name present in database
mongoose.connect("mongodb://localhost:27017/Demo")
.then(()=>console.log("connection established successfully...."))
.catch((err)=>console.log("error in connection"));

//A mongoose schema defines the structure of the document,default values,validators,etc.,
//A mongoose model is a wrapper on the mongoose schema ,provides an interface to the database for CRUD Operations


//*****************SCHEMA*********************
const studentSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            minlength:[2,"minimum 2 letters required"],
            maxlength:30
        },
        age:{
            type:Number,
            required:true,
            validate(value){ //custom validation
                if(value<=0){
                    throw new Error("age shouldn't be negative!!!")
                }
            }
        },
        id:{
            type:Number
        },
        email:{
            type:String,
            validate(value){ //validation through validator 
                if(!validator.isEmail(value)){
                    throw new Error("not a valid email format!!!!!")
                }
            }
        }
    }
);

//*************MODEL  Collection creation**********************
const Student=new mongoose.model("Student",studentSchema);


//CREATE DOCUMENT OR INSERT
// const document1=new Student(
//     {
//         name:"gagan",
//         age:24,
//         id:23144
//     }
// )

// const result=await document1.save();

//************CREATE DOCUMENT OR INSERT****************
const createDoc=async ()=>{
    try{
        const document1=new Student(
            {
                name:"david",
                age:23,
                id:23244,
                email:"aaa@gmail.com"
            }
        )
        const document2=new Student(
            {
                name:"arjun",
                age:29,
                id:34222,
                email:"bbb@gmail.com"
            }
        )
        const document3=new Student(
            {
                name:"bhargav",
                age:33,
                id:23441,
                email:"ccc@gmail.com"
            }
        )
        const document4=new Student(
            {
                name:"kiran",
                age:30,
                id:42213,
                email:"ddd@gmail.com"
            }
        )
        // const document5=new Student(
        //     {
        //         name:"fafa",
        //         age:-23, //error in creation since we made a validate schema where age shouldn't be -ve
        //         id:42216,
        //         email:"eee@com" //error in creation because not a valid email format
        //     }
        // )
        const result=await Student.insertMany([document1,document2,document3,document4]);
        console.log(result);
    }catch(err){
        console.log("error in creation")
    }
}

createDoc();

//**************Read Document*******************
const data=async()=>{
    try{
    // const res=await Student.find();
    const res=await Student.find({name:"david"},{_id:0,name:1}); 
   // console.log(res); //[ { name: 'david' } ]

    //**********comparison*************
    const res1=await Student.find({age:{$lt:23}}) //gt greaterthan, lt lessthan, in present in, 
   // console.log(res1); //[] since no age is lessthan 23 in the collection
    const res2=await Student.find({name:{$in:["david","gagan"]}}) 
   // console.log(res2); //returns david ,gagan document
    const res3=await Student.find({name:{$nin:["david","gagan"]}}) 
    //console.log(res3); //returns everything except david and gagan 

    //******************logical operators******************
    const res4=await Student.find({$or:[{age:23},{name:"gagan"}]})
    //console.log(res4); //returns documents containing age 23 and name gagan
    const res5=await Student.find({$and:[{age:23},{name:"gagan"}]})
    //console.log(res5);//[] since there is no document containing age 23 and name gagan

    //***********counting**************
    const res6=await Student.find().countDocuments();
    //console.log(res6) //5 as there are total five documents

    //************sorting**************
    const res7=await Student.find().select({name:1}).sort({name:1})
    //console.log(res7) //gives all names in a to z order if.sort({name:-1}) then it gives in z to a order
    }catch(err){
        console.log("documents not found")
    }
}
//data();


    //*************UPDATE***************
const updateDocument=async(_id)=>{
    try{
        const res=await Student.updateOne({_id},{$set:{name:"Gagan"} });
        // console.log(res) //gagan changes to Gagan but it doesn't show changes 
        const res1=await Student.find();
        //console.log(res1)
        const res2=await Student.findByIdAndUpdate({_id},{$set:{name:"Gagan"} });
        //console.log(res2) //gagan changes to Gagan and it shows the result
    }

    catch(err){
        console.log("error in updating document!!!")
    }
}
//updateDocument("62bb0adcd929f95c08a33a68");

    //*************DELETE***************
const deleteDocument=async(_id)=>{
   // const res=await Student.deleteOne({_id});
    //console.log(res); //deletes document but doesn't show
    const res1=await Student.findByIdAndDelete({_id});
    console.log(res1); //deletes the document and shows which one got deleted
}

//deleteDocument("62bc46e8eeb132bdea328f6e");


