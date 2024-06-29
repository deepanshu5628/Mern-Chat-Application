// const BASE_URL="https://mern-airbnb-86cj.onrender.com";
const BASE_URL = "http://localhost:3000";


const BASE_URL_AUTH = BASE_URL + "/api/v1/auth";
// const BASE_URL_LISTING=BASE_URL+"/api/v1/listings";
// const BASE_URL_REVIEW=BASE_URL+"/api/v1/review";
// const BASE_URL_PROFILE = BASE_URL + "/api/v1/profile";


export const user = {
    AUTH_API_LOGIN: BASE_URL_AUTH + "/login",    //done
    AUTH_API_SIGNUP: BASE_URL_AUTH + "/register",   //done
}