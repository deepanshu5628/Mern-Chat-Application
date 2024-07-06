import { toast } from "react-toastify";
import { apiconnector } from "../apiconnector";
import { auth } from "../apis"
import { useDispatch } from "react-redux";
import { setloading, setlogout, settoken, setuserinfo } from "../../Redux/Slices/authSlice"
export async function SignUphandler(data, navigate, dispatch) {
    try {
        dispatch(setloading(true));
        let res = await apiconnector("POST", auth.AUTH_API_SIGNUP, data)
        if (res.success) {
            toast.success(res.message);
            navigate("/");
        }
        if (!res.success) {
            toast.error(res.message);
        }
        dispatch(setloading(false));

    } catch (error) {
        console.log(error);
    }
}



export async function loginhandler(data, navigate, dispatch) {
    try {
        dispatch(setloading(false));
        let res = await apiconnector("POST", auth.AUTH_API_LOGIN, data)
        if (res.success) {
            toast.success(res.message);
            // token saved
            dispatch(settoken(res.token));
            localStorage.setItem("token", JSON.stringify(res.token));
            // localinfosaved
            dispatch(setuserinfo(res.userinfo));
            localStorage.setItem("userinfo", JSON.stringify(res.userinfo));
            navigate("/home");
        }
        if (!res.success) {
            toast.error(res.message);
        }
        dispatch(setloading(false));
    } catch (error) {
        console.log(error);
    }
}

export async function logouthandler(navigate, dispatch) {
    try {
        dispatch(setloading(true));
        localStorage.clear();
        dispatch(setlogout());
        navigate("/");
        toast.success("loged out");
        dispatch(setloading(false));
    } catch (error) {
        console.log(error);
    }
}