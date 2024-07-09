const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
app.use(cors());
app.use(express.json());
// strting db 
const startdb = require("./config");
startdb();


// socket code
// const http = require("http");
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5173"
//     }
// });

// starting server 
app.listen(port, () => {
    console.log("server is running on port", port);
})
// starting socket
// io.on("connect", (socket) => {
//     console.log("user is coonected of id deep ", socket.id);
//     socket.on("disconnect",()=>{
//         console.log("user disconnected ",socket.id);
//     })
// })





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