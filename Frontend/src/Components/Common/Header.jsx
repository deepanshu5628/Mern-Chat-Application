import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { logouthandler} from "../../Services/Operations/Authorization";
import { setsearchbar } from "../../Redux/Slices/authSlice";
function Header() {
    let { userinfo, token, loading ,searchbar} = useSelector((state) => state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    return (
        <div className="p-2 py-4 px-5  text-xl bg-gray-500 flex  justify-between ">
            {/* div 1 */}
            <div onClick={()=>dispatch(setsearchbar(true))} className="flex justify-center items-center gap-3  cursor-pointer ">
                <FaSearch className="self-center" />
                <p > Search bar</p>
            </div>
            {/* div 2 */}
            <div className="font-bold text-2xl cursor-default"> {userinfo ?userinfo.email:"cai pe charcha"}</div>
            {/* div 3 */}
            <div className="flex   items-center gap-2">
                    <img src={userinfo.picture} className="h-8 w-8 rounded-full" alt="" />
                    <IoIosNotifications className="self-center text-3xl" />
                    <button onClick={()=>logouthandler(navigate,dispatch)} className="p-2 bg-red-400 rounded-md">Log out</button>
            </div>

        </div>
    )
}

export default Header;