const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

//you don't need express.json() for GET and DELETE methods ,you require it for POST and PUT,PATCH methods
//express.json() is a method to recognize th incoming request object as JSON object.This method is called as middleware

app.use(express.json());

//to get the connection.js file
require("./db/connection");

const Student = require("./models/students");

//to define root folder
app.get("/", (req, res) => {
    res.send("home page...")
})

//create students collections
app.post("/students", (req, res) => {
    console.log(req.body);
    const doc = new Student(req.body);
    doc.save().then(() => {
        res.status(201).send(doc);
    }).catch((err) => {
        res.status(400).send(err);
    });
    // res.send("server is running...");
})

app.listen(port, () => {
    console.log(`connection is setup at ${port}`)
})