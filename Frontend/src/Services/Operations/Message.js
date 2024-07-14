import { apiconnector } from "../apiconnector";
import { message } from "../apis";

export async function Sendmsg(data,token){
    try {
        let res=await apiconnector("POST",message.MESSAGE_API_SENDMSG,data,{
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        })
        return res;
    } catch (error) {
        console.log(error);
    }
}
export async function fetchchatmsgs(id,token){
    try {
        let res=await apiconnector("GET",message.MESSAGE_API_GETCHATMSG+id,null,{
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        })
        return res;
    } catch (error) {
        console.log(error);
    }
}