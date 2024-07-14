import { createSlice } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";

const authSlice=createSlice({
    name:"auth",
    initialState:{
        token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
        loading:false,
        userinfo:localStorage.getItem("userinfo")?JSON.parse(localStorage.getItem("userinfo")):null,
        searchbar:false,
        dialogbox:false,
        selectedchat:localStorage.getItem("selectedchat")?JSON.parse(localStorage.getItem("selectedchat")):null,
        chatkmsg:localStorage.getItem("chatkmsg")?JSON.parse(localStorage.getItem("chatkmsg")):[],
    },
    reducers:{
        settoken:(state,actions)=>{
            state.token=actions.payload;
        },
        setloading:(state,actions)=>{
            state.loading=actions.payload;
        },
        setuserinfo:(state,actions)=>{
            state.userinfo=actions.payload;
        },
        setsearchbar:(state,actions)=>{
            state.searchbar=actions.payload;
        },
        setdialogbox:(state,actions)=>{
            state.dialogbox=actions.payload;
        },
        setselectedchat:(state,actions)=>{
            state.selectedchat=actions.payload;
        },
        setchatkmsg:(state,actions)=>{
            state.chatkmsg=actions.payload;
        },
        setlogout:(state)=>{
            state.userinfo=null;
            state.token=null;
            state.loading=false;
            state.searchbar=false;
            state.dialogbox=false;
            state.selectedchat=null;
            state.chatkmsg=[];
        }
    }
});
export const {settoken,setloading,setuserinfo,setsearchbar,setlogout,setdialogbox,setselectedchat,setchatkmsg}=authSlice.actions;
export default authSlice.reducer;