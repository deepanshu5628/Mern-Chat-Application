const { getreciversocketid,io} = require("../index");
const Chat = require("../Models/Chat");
const Message = require("../Models/Message");
const User = require("../Models/User");
const sendmess = async (req, res) => {
    try {
        let { content, senderid, chatid } = req.body;
        // validatae chatid and senderid 
        let chatidinfo = await Chat.findOne({ _id: chatid });
        // console.log(chatidinfo)
        let senderkiid=chatidinfo.users[0]._id==senderid?chatidinfo.users[1]._id:chatidinfo.users[0]._id
        let senderidinfo = await User.findOne({ _id: senderid }).select("name email");
        if (!chatidinfo || !senderidinfo) {
            return res.status(200).json({
                success: false,
                message: "Chatid or sender id one is wrong",
            })
        }
        // check if the content is not empty 
        if (content.length == 0) {
            return res.status(200).json({
                success: false,
                message: "Content can't be null",
            })
        }
        // create the message !
        let messageinfo;
        try {
            messageinfo = await Message.create({
                content: content,
                sender: senderidinfo,
                chat: chatidinfo,
            })
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: "Error while creating a message",
            })
        }
        
        // set latest msg of the chat 
        let updatedchata=await Chat.findByIdAndUpdate(chatid,{latestMessage:messageinfo._id},{new:true});
        
        // socket id 
        let socketid=getreciversocketid(senderkiid);
        if(socketid !==undefined){
            // console.log("the other user is also online ");
            // console.log(socketid);
            io.to(socketid).emit("newmessage",messageinfo);
        }

        // send responce 
        res.status(200).json({
            success:true,
            message:"Message sended successfully",
            data:messageinfo
        })

    } catch (error) {
        res.status(200).json({
            success: false,
            message: "error in send message controller",
            data: error.message,
        })
    }
}

const chatmessages=async(req,res)=>{
    try {
        // console.log(req.params)
        let {chatid}=req.params;
        if(!chatid){
            return res.status(200).json({
                success: false,
                message: "Chat id is missing",
            })
        }
        // validate the chat id 
        let chatidinfo = await Chat.findOne({ _id: chatid });
        if(!chatidinfo){
            return res.status(200).json({
                success: false,
                message: "Chatid  wrong",
            })
        }
        // fetch all the messaged of the chat id 
        let allmessages=await Message.find({chat:chatid}).populate("sender","name email _id").populate("chat","chatName latestMessage groupAdmin isGroupChat users").populate("readBy","name");

        res.status(200).json({
            success:true,
            message:"Message sended successfully",
            data:allmessages,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "error in get messg of a chat  controller",
            data: error.message,
        })
    }
}
module.exports = {sendmess,chatmessages};