const User = require("../Models/User");
const Chat = require("../Models/Chat");
// create chat 
const createChat = async (req, res) => {
    try {

        let ownerid = req.user._id;
        let sendendid = req.body.id;

        let secondpartyinfo = await User.findById(sendendid);
        // if the 2nd party id is invalid 
        if (!secondpartyinfo) {
            return res.status(200).json({
                success: false,
                message: "2nd party is not found",
                data: error.message,
            })
        }
        // check if there is already a chat ?
        let ischatexist = await Chat.findOne({ users: [ownerid, sendendid] });
        if (ischatexist) {
            return res.status(200).json({
                success: false,
                message: "Chat already exist",
            })
        }
        let createdchat;
        try {
            createdchat = await Chat.create({
                chatName: secondpartyinfo.name,
                users: [ownerid, sendendid],
            })
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: "error in creating a new chat ",
                data: error.message,
            })
        }

        // send responce 
        res.status(200).json({
            success: true,
            message: "Chat created Successfully",
            data: createdchat,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "error in create chat  controller",
            data: error.message,
        })
    }
}

// create gropp chat 
const creategroupChat = async (req, res) => {
    try {

        let ownerid = req.user._id;
        let { users, isGroupChat, chatName } = req.body;
        users.push(ownerid);
        let createdchat;
        try {
            createdchat = await Chat.create({
                chatName: chatName,
                users: users,
                isGroupChat: true,
                groupAdmin: ownerid,
            })
        } catch (error) {
            return res.status(200).json({
                success: false,
                message: "error in creating a new chat ",
                data: error.message,
            })
        }
        // send responce 
        res.status(200).json({
            success: true,
            message: "Chat created Successfully",
            data: createdchat,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "error in create chat  controller",
            data: error.message,
        })
    }
}




// getall chats
const getallchats = async (req, res) => {
    try {
        let ownerid = req.user._id;
        let allchats = await Chat.find({ users: { $in: ownerid } }).populate("users");
        if (!allchats) {
            return res.status(200).json({
                success: true,
                message: "No Chat found",
                data: allchats,
            })
        }
        res.status(200).json({
            success: true,
            message: "all chat data",
            data: allchats,
        })
    } catch (error) {
        res.status(200).json({
            success: false,
            message: "error in getall chats  controller",
            data: error.message,
        })
    }
}

module.exports = { getallchats, createChat, creategroupChat };;