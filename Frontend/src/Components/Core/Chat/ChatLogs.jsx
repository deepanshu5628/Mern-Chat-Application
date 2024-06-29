import React from 'react'
import { FaPlus } from "react-icons/fa";
function ChatLogs() {
  let data = [
    {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    },
    {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    },
  ];
  let data1 = [
    {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    }, {
      users: "deep",
      chatName: "Congress party",
      latestMessage: "last msg",
    },
  ];
  return (
    <div className=' w-[29%] h-full rounded-lg p-3 px-4 bg-pink-300'>
      {/* div 1 */}
      <div className='flex justify-between '>
        <p className='text-3xl cursor-default'>My Chats</p>
        <div className='p-2 rounded-md bg-gray-500 flex gap-2 cursor-pointer'>
          <p >New Group Chat</p>
          <FaPlus className='self-center' />
        </div>
      </div>
      {/* div 2 */}
      <div className='my-4 p-1 max-h-[calc(100vh-11rem)] overflow-y-auto '>
        {
          data.map((item, index) => {
            return <div className='bg-gray-700 p-2 rounded-md my-2 cursor-pointer ' key={index}>
              <p>{item.chatName.substring(0, 30)}</p>
              <div className='flex'>
                <p className='font-bold'>{item.users.substring(0, 15)}:</p>
                <p>{item.latestMessage.substring(0, 30)}</p>
              </div>
            </div>
          })
        }
      </div>
    </div>
  )
}

export default ChatLogs;
