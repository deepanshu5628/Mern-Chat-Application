import React, { useEffect, useState } from 'react'
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchallchats } from "../../../../Services/Operations/Chats";
import { TbCircleDot } from "react-icons/tb";
import { setsearchbar, setdialogbox, setselectedchat } from '../../../../Redux/Slices/authSlice';
import Dialogbox from '../../../Common/Dialogbox';
function ChatLogs() {
  const { token, searchbar, dialogbox, userinfo, selectedchat } = useSelector((state) => state.auth);
  let { onlineuser } = useSelector((state) => state.socket);
  const dispatch = useDispatch();
  let [user, setuser] = useState([]);
  let [loading, setloading] = useState(false);

  // let data = [
  //   {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   },
  //   {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   }, {
  //     users: "deep",
  //     chatName: "Congress party",
  //     latestMessage: "last msg",
  //   },
  // ];
  // let data2 = [];

  const fetchchats = async () => {
    setloading(true);
    let res = await fetchallchats(token);
    if (res.success) {
      setuser(res.data);
    }
    setloading(false);
  }
  useEffect(() => {
    fetchchats();
  }, [searchbar, dialogbox, selectedchat])


  // fxn1 
  function openchat(item) {
    dispatch(setselectedchat(item));
    localStorage.setItem("selectedchat", JSON.stringify(item));
  }
  return (
    <div className=' w-[29%] h-full rounded-lg p-3 px-4 bg-pink-300'>
      {/* div 1 */}
      <div className='flex justify-between '>
        <p className='text-3xl cursor-default'>My Chats</p>
        <button onClick={() => dispatch(setdialogbox(true))} className='p-2 rounded-md bg-gray-500 flex gap-2 cursor-pointer'>
          <p >New Group Chat</p>
          <FaPlus className='self-center' />
        </button>
      </div>
      {/* div 2 */}
      <div className='my-2 p-1 w-full max-h-[calc(100vh-12rem)] overflow-y-auto '>
        {
          loading ? <div className='w-full h-[calc(16rem)] flex justify-center items-center'><div className='loader'></div>
          </div> : <>
            {
              user.length == 0 ? <div className='w-full  h-[calc(16rem)] flex justify-center items-center '>
                <div className='flex-row '>
                  <p className='p-2 text-xl cursor-default'>No Chats</p>
                  <button className='p-2 my-1 text-xl bg-green-600 rounded-md' onClick={() => dispatch(setsearchbar(true))}>New Chat</button>
                </div>
              </div> : user.map((item, index) => {
                return <div onClick={() => openchat(item)} className={`bg-gray-700 p-2 rounded-md my-2 cursor-pointer flex gap-3 ${selectedchat && selectedchat._id == item._id && `bg-yellow-600`}`} key={index}>
                  <img className='w-14 h-14 rounded-md' src={item.users[1].picture} />
                  
                  {/* yellow tick of online */}
                  {item.isGroupChat !==true && onlineuser.length > 0 && item.users[0]._id==userinfo._id && onlineuser.some((onlineuserid)=>onlineuserid==item.users[1]._id) &&<>
                    <div className='relative right-[16%] text-2xl  '>
                      <TbCircleDot className='bg-yellow-300 rounded-full ' />
                    </div>
                  </>
                  }
                  {item.isGroupChat !==true && onlineuser.length > 0 && item.users[1]._id==userinfo._id && onlineuser.some((onlineuserid)=>onlineuserid==item.users[0]._id) &&<>
                    <div className='relative right-[16%] text-2xl  '>
                      <TbCircleDot className='bg-yellow-300 rounded-full ' />
                    </div>
                  </>
                  }
                 
                  {/* name */}
                  <div>
                    <p className='font-bold text-xl'>{item.isGroupChat === true ? item.chatName : item.users[0].name == userinfo.name ? item.users[1].name : item.users[0].name}</p>
                    {
                      item.latestMessage && <p>{item.latestMessage.content.substring(0, 15)}..</p>
                    }
                  </div>

                </div>
              })
            }
          </>
        }
      </div>
    </div>
  )
}

export default ChatLogs;