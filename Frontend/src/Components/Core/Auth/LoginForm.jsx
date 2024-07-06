import { useState } from "react";
import { loginhandler } from "../../../Services/Operations/Authorization";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
function LoginForm() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    let [formdata,setformdata]=useState({
        email:"",
        password:"",
    })

    function changehandlerfxn(e){
        setformdata((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    async function formsubmithandler(e){
        e.preventDefault();
        let res=await loginhandler(formdata,navigate,dispatch);
    }
    return (
        <div>
            <form  onSubmit={formsubmithandler}>
                <div className="flex flex-col gap-3 p-4 ">
                    <label htmlFor="email"> Email:
                        <br />
                        <input
                            type="text"
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
                            placeholder="**********"
                            id="pass"
                            className='w-full p-1 rounded-md'
                            value={formdata.password}
                            name="password"
                            onChange={changehandlerfxn}
                        />
                    </label>
                    <button className="bg-sky-400 p-1 m-1">Login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginForm;