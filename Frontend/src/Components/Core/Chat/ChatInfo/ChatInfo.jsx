import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { setchatkmsg } from "../../../../Redux/Slices/authSlice";
import { fetchchatmsgs, Sendmsg } from "../../../../Services/Operations/Message";
import Messageinput from "./Messageinput";
import Chatinfoheading from "./Chatinfoheading";
function ChatInfo() {
    let dispatch = useDispatch();
    let { selectedchat, userinfo, token, chatkmsg } = useSelector((state) => state.auth);
    let { socket } = useSelector((state) => state.socket);

    // let [chatkmsg, setchatkmsg] = useState([]);

    let [loading, setloading] = useState(false);

    // fxn2 
    async function fetchchatkmsg() {
        console.log("fetchchatkmsg is called");
        if (selectedchat == null) {
            return;
        }
        setloading(true);
        let res = await fetchchatmsgs(selectedchat._id, token);
        if (res.success) {
            // dispatch(setchatkmsg(res.data));
            dispatch(setchatkmsg(res.data));
            // localStorage.setItem("chatkmsg", JSON.stringify(res.data));
        }
        setloading(false);
    }

    useEffect(() => {
        console.log("use callb ack fxn is called");
        socket?.on("newmessage", (abc) => {
            if (abc !== null ) {
                // send message  in else case sned notic
                if (abc.chat._id === selectedchat._id) {
                    console.log("abc id is ",abc.chat._id);
                    console.log("chatid id is ",selectedchat._id);
                    // console.log("caht k msg is ",abc)
                    dispatch(setchatkmsg([...chatkmsg, abc]));
                    console.log("xyz")
                } else {
                    console.log("there is a notification baby ");
                }
            }
        })
        return () => socket?.off("newmessage");
    }, [chatkmsg])

    useEffect(() => {
        fetchchatkmsg();
    }, [selectedchat])

    let revchatkmsg = [];
    for (let i = chatkmsg.length - 1; i >= 0; i--) {
        revchatkmsg.push(chatkmsg[i]);
    }

    return (
        <div className='w-[69%] rounded-lg p-3 bg-pink-900'>
            {/* in case of no message is exvhanged  */}
            {
                selectedchat == null &&
                <div className="h-full flex justify-center items-center">
                    <p className="text-4xl">CLick on a user to start chating</p>
                </div>
            }

            {/* in case msg are there  */}
            {
                selectedchat != null && <div className="flex flex-col w-full h-full">
                    {/* heading  */}
                    <Chatinfoheading />

                    {/* -------------------------------messages div ----------------------- */}
                    <div className="w-full  min-h-[calc(100vh-11rem)]  px-2 p-2 bg-gray-900 rounded-md">
                        {/*Message*/}
                        <div className="h-[89%]  flex flex-col-reverse justify-start py-2 overflow-auto ">
                            {
                                loading ? <div> <div className="loader"></div></div> : chatkmsg.length == 0 ? null : revchatkmsg.map((item, index) => {
                                    return <p key={index} className={`text-white my-1  ${item.sender._id == userinfo._id ? "bg-red-500 pr-3 self-end" : "pl-3"}`}>{item.content}</p>
                                })
                            }
                        </div>

                        {/* message input  */}
                        <Messageinput />
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatInfo;