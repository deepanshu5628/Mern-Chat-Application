import React from 'react'
import { useSelector } from 'react-redux';
import { FaEye } from "react-icons/fa";


function Chatinfoheading() {
    let {selectedchat,userinfo}=useSelector((state)=>state.auth);
    return (
        <div className="  w-full flex justify-between p-2 px-4 ">
            <p className="text-3xl font-semibold ">{selectedchat.isGroupChat === true ? selectedchat.chatName : selectedchat.users[1].name == userinfo.name ? selectedchat.users[0].name : selectedchat.users[1].name}</p>
            <FaEye className="text-3xl" />
        </div>
    )
}

export default Chatinfoheading;