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
        setlogout:(state)=>{
            state.userinfo=null;
            state.token=null;
            state.loading=false;
            state.searchbar=false;
            state.dialogbox=false;
            state.selectedchat=null;
        }
    }
});
export const {settoken,setloading,setuserinfo,setsearchbar,setlogout,setdialogbox,setselectedchat}=authSlice.actions;
export default authSlice.reducer;