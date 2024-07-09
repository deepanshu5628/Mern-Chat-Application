import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
function ChatInfo() {
    let dispatch = useDispatch();
    let { selectedchat } = useSelector((state) => state.auth);
    let [chatkemsg, setchatkemsg] = useState([]);
    let [inputmsg, setinputmsg] = useState("");
    let [loading, setloading] = useState(false);


    // fxn 1
    function sendmsgfxn(e) {
        if (e.code == "Enter" || e.target.name === "sendbtn") {
            console.log("bhejo");
        }
    }
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
                        <p className="text-3xl font-semibold ">{selectedchat.chatName}</p>
                        <FaEye className="text-3xl" />
                    </div>
                    <div className="w-full  min-h-[calc(100vh-11rem)]  px-2 p-2 bg-gray-900 rounded-md">
                        <div className="h-[89%]  flex flex-col justify-start py-2">
                            {
                                loading == false && chatkemsg.length == 0 ? null : chatkemsg.map((item, index) => {
                                    return <p key={index}>heelo g</p>
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