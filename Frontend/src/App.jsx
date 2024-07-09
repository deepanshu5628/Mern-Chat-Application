import { Route, Routes } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import { useEffect } from "react";
// import {io} from "socket.io-client";
// const url = "http://localhost:3000";
export default function App() {
  // const socket = io(url);
  // useEffect(()=>{
  //   socket.on("connect",()=>{
  //     console.log("connected");
  //   })

  //   return ()=>{
  //     socket.disconnect();
  //   }
  // },[])
  return (
    <Routes>
      <Route path="/" Component={AuthPage} />
      <Route path="/home" Component={HomePage} />
    </Routes>
  )
}