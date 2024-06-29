import {apiconnector} from "../apiconnector";
import {user} from "../apis"
export async function SignUphandler(data){
    try {
        let res=await apiconnector("POST",user.AUTH_API_SIGNUP,data) 
        if(res.success){

        }
        
    } catch (error) {
        console.log(error);
    }
}



export async function loginhandler(data){
    try {
        let res=await apiconnector("POST",user.AUTH_API_LOGIN,data) 
        if(res.success){
            
        }
    } catch (error) {
        console.log(error);
    }
}