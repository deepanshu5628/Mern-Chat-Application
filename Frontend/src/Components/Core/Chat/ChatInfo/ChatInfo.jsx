import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import {setchatkmsg} from "../../../../Redux/Slices/authSlice";
import { fetchchatmsgs, Sendmsg } from "../../../../Services/Operations/Message";
function ChatInfo() {
    let dispatch = useDispatch();
    let { selectedchat ,userinfo,token,chatkmsg} = useSelector((state) => state.auth);
    // let [chatkmsg, setchatkmsg] = useState([]);
    let [inputmsg, setinputmsg] = useState("");
    let [loading, setloading] = useState(false);
    // console.log("selected chat is ",selectedchat);
    // console.log("curr user  is ",userinfo);
    // fxn 1
    async function sendmsgfxn(e) {
        if (e.code == "Enter" || e.target.name === "sendbtn") {
            if(inputmsg.length==0){
                return ;
            }
            let data={
                chatid:selectedchat._id,
                senderid:userinfo._id,
                content:inputmsg,
            }
            let res=await Sendmsg(data,token);
            if(res.success){
                setinputmsg("");
                fetchchatkmsg();
            }
        }
    }

    // fxn2 
    async function fetchchatkmsg(){
        if(selectedchat ==null){
            return ;
        }
        setloading(true);
        let res=await fetchchatmsgs(selectedchat._id,token);
        if(res.success){
            dispatch(setchatkmsg(res.data));
            localStorage.setItem("chatkmsg",JSON.stringify(res.data));
        }
        setloading(false);
    }
    useEffect(()=>{
        fetchchatkmsg();
    },[selectedchat])

    return (
        <div className='w-[69%] rounded-lg p-3 bg-pink-900'>
            {
                selectedchat == null &&
                <div className="h-full flex justify-center items-center">
                    <p className="text-4xl">CLick on a user to start chating</p>
                </div>
            }
            {
                selectedchat != null && <div className="flex flex-col w-full h-full">
                    <div className="  w-full flex justify-between p-2 px-4 ">
                        <p className="text-3xl font-semibold ">{selectedchat.isGroupChat===true ?selectedchat.chatName: selectedchat.users[1].name==userinfo.name ? selectedchat.users[0].name:selectedchat.users[1].name}</p>
                        <FaEye className="text-3xl" />
                    </div>
                    <div className="w-full  min-h-[calc(100vh-11rem)]  px-2 p-2 bg-gray-900 rounded-md">
                        <div className="h-[89%]  flex flex-col justify-start py-2 overflow-auto">
                            {
                                loading  ? <div> <div className="loader"></div></div> : chatkmsg.length == 0 ? null : chatkmsg.map((item, index) => {
                                    return <p key={index} className={`text-white my-1  ${item.sender._id ==userinfo._id ?"bg-red-500 pr-3 self-end":"pl-3"}`}>{item.content}</p>
                                })
                            }
                     
                        </div>
                        <div className="flex gap-2 h-[11%]  w-full">
                            <input type="text"
                                placeholder="Enter msg"
                                value={inputmsg}
                                onChange={(e) => setinputmsg(e.target.value)}
                                className="w-full rounded-md px-2 py-1"
                                onKeyDown={sendmsgfxn}
                            />
                            <button name="sendbtn" onClick={sendmsgfxn} className="p-2 bg-green-600 rounded-md ">Send</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatInfo;