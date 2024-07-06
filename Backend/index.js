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

// auth routes
const AuthRoutes=require("./Routes/auth");
app.use("/api/v1/auth",AuthRoutes);

// user routes
const UserRoutes=require("./Routes/user.js");
app.use("/api/v1/user",UserRoutes);

// chat routes
const ChatRoutes=require("./Routes/chat.js");
app.use("/api/v1/chat",ChatRoutes);
