const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//you don't need express.json() for GET and DELETE methods ,you require it for POST and PUT,PATCH methods
//express.json() is a method to recognize th incoming request object as JSON object.This method is called as middleware

app.use(express.json());

const studentRouter=require("./routers/student");
app.use(studentRouter);

//to get the connection.js file
require("./db/connection");

//const Student = require("./models/students");

//to define root folder
app.get("/", (req, res) => {
    res.send("home page...")
})


//1.create a new router
//2.we need to define the router
//3.we need to register our router

// //create student document through async and await by POST method
// app.post('/students',async(req,res)=>{
//     try{
//         console.log(req.body);
//         const doc=new Student(req.body);
//         const createDoc=await doc.save();
//         res.status(201).send(createDoc);
//     }catch(err){
//         res.status(401).send(err);
//     }
// });

// //read student document through GET method
// app.get("/students",async(req,res)=>{
//     try{
//         const studentData=await Student.find();
//         console.log(studentData);
//         res.status(201).send(studentData);
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// ///read individual data 
// app.get("/students/:id",async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const studentData=await Student.findById(id);
//         if(!id){
//             res.status(500).send();
//         }else{
//             res.send(studentData);
//         }
//     }catch(err){
//         res.status(500).send(err);
//     }
// })

// //update document through id by PATCH method
// app.patch("/students/:id",async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const newData=await Student.findByIdAndUpdate(id,req.body,{new:true});
//         console.log(newData);
//         res.send(newData);
//     }catch(err){
//         res.status(404).send(err);
//     }
// })

// //delete document through id by DELETE method
// app.delete("/students/:id",async(req,res)=>{
//     try{
//         const id=req.params.id;
//         const deleteData=await Student.findByIdAndDelete(id);
//         if(!id){
//             res.status(400).send();
//         }else{
//             res.status(201).send(deleteData);
//         }
//     }catch(err){
//         res.status(500).send(err);
//     }
// })


app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
})