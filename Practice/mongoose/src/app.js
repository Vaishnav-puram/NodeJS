const mongoose=require("mongoose");

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
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        id:Number
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
                id:23244
            }
        )
        const document2=new Student(
            {
                name:"arjun",
                age:29,
                id:34222
            }
        )
        const document3=new Student(
            {
                name:"bhargav",
                age:33,
                id:23441
            }
        )
        const document4=new Student(
            {
                name:"kiran",
                age:30,
                id:42213
            }
        )
        const result=await Student.insertMany([document1,document2,document3,document4]);
        console.log(result);
    }catch(err){
        console.log("error in creation")
    }
}
// createDoc();

//**************Read Document*******************
const data=async()=>{
    try{
    // const res=await Student.find();
    const res=await Student.find({name:"david"},{_id:0,name:1}); 
   // console.log(res); //[ { name: 'david' } ]
    const res1=await Student.find({age:{$lt:23}}) //gt greaterthan, lt lessthan, in present in, 
   // console.log(res1); //[] since no age is lessthan 23 in the collection
    const res2=await Student.find({name:{$in:["david","gagan"]}}) 
   // console.log(res2); //returns david ,gagan document
    const res3=await Student.find({name:{$nin:["david","gagan"]}}) 
    //console.log(res3); //returns everything except david and gagan 
    const res4=await Student.find({$or:[{age:23},{name:"gagan"}]})
    //console.log(res4); //returns documents containing age 23 and name gagan
    const res5=await Student.find({$and:[{age:23},{name:"gagan"}]})
    //console.log(res5);//[] since there is no document containing age 23 and name gagan
    }catch(err){
        console.log("documents not found")
    }
}
data();


