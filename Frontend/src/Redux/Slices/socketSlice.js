import { createSlice } from "@reduxjs/toolkit";

let socketSlice=createSlice({
    name:"socket",
    initialState:{
        socket:null,
        onlineuser:[],
    },
    reducers:{
        setsocket:(state,actions)=>{
            state.socket=actions.payload;
        },
        setonlineuser:(state,actions)=>{
            state.onlineuser=actions.payload;
        }
    }
})

export const {setsocket,setonlineuser}=socketSlice.actions;
export default socketSlice.reducer;

