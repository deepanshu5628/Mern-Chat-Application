import React, { useState } from 'react'
import LoginForm from '../Components/Core/Auth/LoginForm';
import SignUpForm from '../Components/Core/Auth/SignUpForm';

function AuthPage() {
  let [olduser,setolduser]=useState(true);
  return (
    <div className='bg-sky-600 h-screen flex justify-center '>
      <div className='my-8 flex-col gap-3 '>
        <div className='flex self-center justify-center  min-w-96 min-h-20 bg-gray-400  my-3'>
          <h1 className='text-black text-center self-center text-3xl'>Chai Pe Charcha</h1>
        </div>
        <div className=' p-3 min-w-96 min-h-60 bg-gray-400 my-3 '>
          <div className='flex w-full flex-row gap-9 cursor-pointer self-center justify-center '>
            <p onClick={()=>setolduser(true)} className={olduser ? "bg-sky-400 p-2 rounded-lg text-xl":"text-lg"}>Login</p>
            <p onClick={()=>setolduser(false)} className={olduser ?"text-lg":"bg-sky-400 p-2 rounded-lg text-xl"}>Sign Up</p>
          </div>
          {
            olduser ? <LoginForm/>:<SignUpForm/>
          }
        </div>
      </div>
    </div>
  )
}

export default AuthPage;
