// const BASE_URL="https://mern-airbnb-86cj.onrender.com";
const BASE_URL = "http://localhost:3000";


const BASE_URL_AUTH = BASE_URL + "/api/v1/auth";
const BASE_URL_USER=BASE_URL+"/api/v1/user";
const BASE_URL_CHAT=BASE_URL+"/api/v1/chat";
// const BASE_URL_REVIEW=BASE_URL+"/api/v1/review";
// const BASE_URL_PROFILE = BASE_URL + "/api/v1/profile";


export const auth = {
    AUTH_API_LOGIN: BASE_URL_AUTH + "/login",    //done
    AUTH_API_SIGNUP: BASE_URL_AUTH + "/register",   //done
}

export const  user={
    USER_API_SEARCHUSER:BASE_URL_USER+"/searchuser",
}

export const chats={
    CHAT_API_GETALLUSER:BASE_URL_CHAT+"/getallchats",
    CHAT_API_CREATECHAT:BASE_URL_CHAT+"/create",
    CHAT_API_CREATEGROUPCHAT:BASE_URL_CHAT+"/creategroup"
}