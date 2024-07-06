import React from 'react'
import Header from '../Components/Common/Header';
import ChatInfo from '../Components/Core/Chat/ChatInfo/ChatInfo';
import ChatLogs from '../Components/Core/Chat/ChatLogs';
import { useDispatch, useSelector } from 'react-redux';
import Searchbar from '../Components/Common/Searchbar';
import { setdialogbox, setsearchbar } from '../Redux/Slices/authSlice';
import Dialogbox from '../Components/Common/Dialogbox';

function HomePage() {
    let {searchbar,dialogbox} =useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    return (
        <div className='min-w-full min-h-screen  bg-sky-400'>
            <Header />
            <div onClick={()=>{
                searchbar?dispatch(setsearchbar(false)) :null;
                dialogbox?dispatch(setdialogbox(false)):null;
            }} className='mt-4 m-2 mx-3 h-[calc(100vh-6rem)] flex justify-between  bg-sky-400 '>
                <ChatLogs />
                <ChatInfo />
            </div>
            {
                searchbar? <Searchbar/>:null
            }
            {
                dialogbox? <Dialogbox/>:null
            }
        </div>
    )
}

export default HomePage;
