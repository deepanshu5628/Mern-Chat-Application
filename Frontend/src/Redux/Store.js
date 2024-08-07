import { configureStore} from "@reduxjs/toolkit"
import authSlice from "./Slices/authSlice";
import socketSlice from "./Slices/socketSlice";
const Store=configureStore({
    reducer:{
        "auth":authSlice,
        "socket":socketSlice,
    }
})

export default Store;