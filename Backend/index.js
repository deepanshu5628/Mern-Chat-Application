const express=require("express");
const app=express();
const cors=require("cors");

const port=3000;
app.use(cors());
app.use(express.json());

const startdb=require("./config");
startdb();
app.listen(port,()=>{
    console.log("app is running on port",port);
})

// routes
const UserRoutes=require("./Routes/User");
app.use("/api/v1/auth",UserRoutes);