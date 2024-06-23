const express=require("express");
const app=express();
const cors=require("cors");

const port=3000;

const startdb=require("./config");
startdb();
app.listen(port,()=>{
    console.log("app is running on port",port);
})

app.use(cors());