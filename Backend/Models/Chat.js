const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }],
    chatName: {
        type: String,
        required: true,
        trim: true,
    },
    isGroupChat: {
        type: Boolean,
        required: true,
        default:false,
    },
    groupAdmin: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    latestMessage: {
        type: mongoose.Types.ObjectId,
        ref: "Message",
    }
}, {
    timestamps: true,
}
);

const Chat=mongoose.model("Chat",chatSchema);
module.exports=Chat;