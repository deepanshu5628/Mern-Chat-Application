import React from 'react'
import Header from '../Components/Common/Header';
import ChatInfo from '../Components/Core/Chat/ChatInfo';
import ChatLogs from '../Components/Core/Chat/ChatLogs';

function HomePage() {
    return (
        <div className='min-w-full min-h-screen  bg-sky-400'>
            <Header />
            <div className='mt-4 m-2 mx-3 h-[calc(100vh-6rem)] flex justify-between  bg-sky-400 '>
                <ChatLogs />
                <ChatInfo />
            </div>
        </div>
    )
}

export default HomePage;
