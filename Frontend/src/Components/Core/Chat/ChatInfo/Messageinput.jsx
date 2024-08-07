import { useDispatch, useSelector } from "react-redux";
import { setchatkmsg } from "../../../../Redux/Slices/authSlice";
import { useState } from "react";
import { fetchchatmsgs, Sendmsg } from "../../../../Services/Operations/Message";

function Messageinput() {
    const dispatch=useDispatch();
    let [inputmsg, setinputmsg] = useState();
    let {chatkmsg,selectedchat,userinfo,token}=useSelector((state)=>state.auth);
    // fxn 1
    async function sendmsgfxn(e) {
        if (e.code == "Enter" || e.target.name === "sendbtn") {
            console.log("send fxn is called");
            if (inputmsg.length == 0) {
                return;
            }
            let data = {
                chatid: selectedchat._id,
                senderid: userinfo._id,
                content: inputmsg,
            }
            let res = await Sendmsg(data, token);
            if (res.success) {
                setinputmsg("");
                // chatkmsg.push(res.data);
                dispatch(setchatkmsg([...chatkmsg,res.data]));
                // fetchchatkmsg();
            }
            if (!res.success) {
                console.log(res);
            }
        }
    }

    return(
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
    )
}

export default Messageinput;