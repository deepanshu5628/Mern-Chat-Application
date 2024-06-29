import React, { useState } from 'react'
import { SignUphandler } from '../../../Services/Operations/Authorization';


export default function SignUpForm() {
    let [formdata,setformdata]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
    })
    function changehandlerfxn(e){
        setformdata((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }
    async function formhandler(e){
        e.preventDefault();
        if(formdata.password !==formdata.confirmPassword){
            console.log("password myst be same");
            return;
        }

        let res=await SignUphandler(formdata);
        
    }
    return (
        <div>
            <form onSubmit={formhandler} >
                <div className="flex flex-col gap-3 p-4 ">
                    <label htmlFor="name"> Name:
                        <br />
                        <input type="name"
                            id="email"
                            className='w-full p-1 rounded-md'
                            placeholder="Enter Name"
                            value={formdata.name}
                            name="name"
                            onChange={changehandlerfxn}
                        />
                    </label>
                    <label htmlFor="email"> Email:
                        <br />
                        <input type="text"
                            id="email"
                            className='w-full p-1 rounded-md'
                            placeholder="@mail.com"
                            value={formdata.email}
                            name="email"
                            onChange={changehandlerfxn}
                        />
                    </label>
                    <label htmlFor="pass"> Password:
                        <br />
                        <input type="password"
                            id="pass"
                            className='w-full p-1 rounded-md'
                            placeholder="**********"
                            value={formdata.password}
                            name="password"
                            onChange={changehandlerfxn}
                        />
                    </label>
                    <label htmlFor="confirmpass"> Confirm Password:
                        <br />
                        <input type="password"
                            id="confirmpass"
                            className='w-full p-1 rounded-md'
                            placeholder="**********"
                            value={formdata.confirmPasswrod}
                            name="confirmPassword"
                            onChange={changehandlerfxn}
                        />
                    </label>
                    <button  className="bg-sky-400 p-1 m-1">Create Account</button>
                </div>
            </form>
        </div>
    )
}
