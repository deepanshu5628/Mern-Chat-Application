import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import {io} from "socket.io-client";
import { useDispatch ,useSelector} from "react-redux";
import { useEffect, useState } from "react";
import {setsocket,setonlineuser} from "./Redux/Slices/socketSlice"
import { setlogout, setsearchbar } from "./Redux/Slices/authSlice";
export default function App() {
  const dispatch=useDispatch();
  let {userinfo}=useSelector((state)=>state.auth);
  let {socket}=useSelector((state)=>state.socket);
  useEffect(()=>{
    if(userinfo){
      let backendurl="http://localhost:3000"
      let socket=io(backendurl,{
        query:{
          userid:userinfo._id,
          username:userinfo.name,
        }
      })

      socket.on("onlineuser",(abc)=>{
        dispatch(setonlineuser(abc));
      })
      
      dispatch(setsocket(socket));
      return ()=>socket.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setsocket(null));
      }
    }
  },[userinfo])


  
  return (
    <Routes>
      <Route path="/" Component={AuthPage} />
      <Route path="/home" Component={HomePage} />
    </Routes>
  )
}





































// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setsocket,setonlineuser } from "./Redux/Slices/socketSlice";
// import { io } from "socket.io-client";
// const url = "http://localhost:3000";



// const dispatch=useDispatch();
//   const { userinfo } = useSelector((state) => state.auth);
//   let {socket,onlineuser}=useSelector((state)=>state.socket);
//   useEffect(() => {
//     if (userinfo) {
//       let socket = io(url, {
//         query: {
//           userid: userinfo._id,
//           username: userinfo.name,
//         }
//       });
//       dispatch(setsocket(socket));
//       socket.on("onlineuser", (data) => {
//           dispatch(setonlineuser(data));
//       })
//       return () => socket.close();
//     } else {
//       if (socket) {
//         socket.close();
//         dispatch(setsocket(null));
//       }
//     }
//   }, [userinfo]);
