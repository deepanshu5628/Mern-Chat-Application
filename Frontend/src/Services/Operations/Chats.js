import { apiconnector } from "../apiconnector";
import {chats} from "../apis";


export async function fetchallchats(token){
    try {
        let res=await apiconnector("GET",chats.CHAT_API_GETALLUSER,null,{
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

export async function createchat(data,token){
    try {
        let res=await apiconnector("POST",chats.CHAT_API_CREATECHAT,{id:data},{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}
export async function creategroupchat(data,token){
    try {
        let res=await apiconnector("POST",chats.CHAT_API_CREATEGROUPCHAT,data,{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}
