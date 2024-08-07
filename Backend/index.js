const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(cors());
app.use(express.json());
// strting db 
const startdb = require("./config");
startdb();

// ------------Without Socket    starting server ---------------------- 
// app.listen(port, () => {
//     console.log("server is running on port", port);
// })


// with socket 
const http=require("http");
const {Server}=require("socket.io");

const server=http.createServer(app);
const io=new Server(server,{
   cors:{
    origin:"http://localhost:5173"
   } 
});

server.listen(port, () => {
        console.log("server is running on port", port);
})

let onlineuser={};
 const getreciversocketid=(reciveruserid)=>{
    return onlineuser[reciveruserid];
}
module.exports={getreciversocketid,io};

io.on("connection",(socket)=>{
    let userid=socket.handshake.query.userid;
    console.log("a new user is connected ",socket.id);

    onlineuser[userid]=socket.id;
    io.emit("onlineuser",Object.keys(onlineuser));
    socket.on("disconnect",()=>{
        console.log("user is disconnected",userid)
        delete onlineuser[userid]
        io.emit("onlineuser",onlineuser);
    })
})



// auth routes
const AuthRoutes = require("./Routes/auth");
app.use("/api/v1/auth", AuthRoutes);

// user routes
const UserRoutes = require("./Routes/user.js");
app.use("/api/v1/user", UserRoutes);

// chat routes
const ChatRoutes = require("./Routes/chat.js");
app.use("/api/v1/chat", ChatRoutes);

// message routes
const MessageRoutes=require("./Routes/message.js");
app.use("/api/v1/message",MessageRoutes);






















// //-------------------------------------- Starting Socket -------------------------------
// // const {io,server}=require("./Socket/Socket.js");
// // socket code
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173"
//     }
// });

// server.listen(port, () => {
//     console.log("server is running on port", port);
// });


// // io.on("connect", (socket) => {
// //     console.log("user is coonected of id deep ", socket.id);
// //     socket.on("disconnect",()=>{
// //         console.log("user disconnected ",socket.id);
// //     })
// // })
// let onlineuser={}
// console.log(onlineuser)
// io.on("connection",(socket)=>{
//     console.log(onlineuser)
//     console.log("a new user is connected dont know who",socket.handshake.query.userid);
//     let userid=socket.handshake.query.userid;
//     onlineuser[userid]=socket.id,
//     io.emit("onlineuser",Object.keys(onlineuser))
//     socket.on("disconnect",()=>{
//         console.log(`${socket.handshake.query.username} is disconnected`)
//         delete onlineuser[userid];
//     })
// })

