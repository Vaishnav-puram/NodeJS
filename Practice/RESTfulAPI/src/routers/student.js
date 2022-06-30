const express=require("express");
const router=new express.Router();
const Student=require("../models/students");

//create student document through async and await by POST method
router.post('/students',async(req,res)=>{
    try{
        console.log(req.body);
        const doc=new Student(req.body);
        const createDoc=await doc.save();
        res.status(201).send(createDoc);
    }catch(err){
        res.status(401).send(err);
    }
});

//read student document through GET method
router.get("/students",async(req,res)=>{
    try{
        const studentData=await Student.find();
        console.log(studentData);
        res.status(201).send(studentData);
    }catch(err){
        res.status(500).send(err);
    }
})

///read individual data 
router.get("/students/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const studentData=await Student.findById(id);
        if(!id){
            res.status(500).send();
        }else{
            res.send(studentData);
        }
    }catch(err){
        res.status(500).send(err);
    }
})

//update document through id by PATCH method
router.patch("/students/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const newData=await Student.findByIdAndUpdate(id,req.body,{new:true});
        console.log(newData);
        res.send(newData);
    }catch(err){
        res.status(404).send(err);
    }
})

//delete document through id by DELETE method
router.delete("/students/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const deleteData=await Student.findByIdAndDelete(id);
        if(!id){
            res.status(400).send();
        }else{
            res.status(201).send(deleteData);
        }
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports=router;
