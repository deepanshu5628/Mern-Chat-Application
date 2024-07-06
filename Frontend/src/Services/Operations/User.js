import { apiconnector } from "../apiconnector";
import { user } from "../apis";

export async function Searchuser(data,token){
    try {
        let res=await apiconnector("POST",user.USER_API_SEARCHUSER,data,{
            "Content-Type":"application/json",
            "authorization":`Bearer ${token}`
        })
        return res;
    } catch (error) {
        console.log(error);
        
    }
}