//file system
const fs=require("fs");

//creating a new file
fs.writeFileSync("read.txt","Sample text file using node!!!");

//append data
fs.appendFileSync("read.txt","My name is Vaishnav!!!")

//Node.js include additional data type called Buffer
//Buffer is mainly used to store binary data

const buf_data=fs.readFileSync("read.txt")
console.log(buf_data)
//<Buffer 53 61 6d 70 6c 65 20 74 65 78 74 20 66 69 6c 65 20 75 73 69 6e 67 20 6e 6f 64 65 21 21 21 4d 79 20 6e 61 6d 65 20 69 73 20 56 61 69 73 
//68 6e 61 76 21 ... 2 more bytes>

const original_data=buf_data.toString();
console.log(original_data); //Sample text file using node!!!My name is Vaishnav!!!

//to rename a file
fs.renameSync("read.txt","readWrite.txt");

//to create a folder
// fs.mkdirSync("demo");

//to add a file into a folder
fs.writeFileSync("demo/example.txt","text file added in demo folder....")

//add contents without overriding 
fs.appendFileSync("demo/example.txt","data added without overriding of existing data.")

//to read files
data=fs.readFileSync("demo/example.txt","utf8")
console.log(data) //text file added in demo folder....data added without overriding of existing data.

//rename a file
fs.renameSync("demo/example.txt","demo/newExp.txt")

//delete file
fs.unlinkSync("demo/newExp.txt")

//delete folder/directory
fs.rmdirSync("demo")
