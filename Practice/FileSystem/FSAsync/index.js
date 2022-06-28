const fs=require("fs");

// fs.r=fs.writeFile("read.txt","file created asynchronously..",
//     ((err)=>{console.log("file is created");
//             console.log(err) //null as there is no error
//}))


// fs.appendFile("read.txt","new data added",
//     (err=>{console.log("task completed")
//         console.log(err)}))

fs.readFile("read.txt","utf8",(err,data)=>{
    console.log(data); //file created asynchronously..new data added
    console.log(err); //null as there is no error
})