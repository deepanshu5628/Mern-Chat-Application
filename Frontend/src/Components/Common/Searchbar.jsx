import { MdCancel } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setsearchbar } from "../../Redux/Slices/authSlice";
import { useState } from "react";
import {toast} from "react-toastify"
import { Searchuser } from "../../Services/Operations/User";
import {createchat} from "../../Services/Operations/Chats";
function Searchbar() {
    const dispatch = useDispatch();
    let { token } = useSelector((state) => state.auth);
    let [query, setquery] = useState("");
    let [result, setresult] = useState([]);
    let [loading, setloading] = useState(false);
    // fxn 1
    async function searchfxn() {
        if (query.length === 0) {
            let emptyarr = []
            setresult(emptyarr);
            return
        }
        setloading(true);
        let res = await Searchuser({ query }, token)
        // console.log(res);
        if (res.success) {
            setresult(res.data)
        }
        if (!res.success) {
            console.log(res.message);
        }
        setloading(false);
    }
    // fxn2
    async function newChatfxn(id){
        let res=await createchat(id,token);
        // console.log(res)
        if(res.success){
            dispatch(setsearchbar(false));
        }
        if(!res.success){
            toast.error(res.message);
        }
    }
    return (
        <div className="absolute top-0 left-0 bg-gray-500 h-full w-[20%]">
            {/* div1  */}
            <div className="flex justify-between p-2 py-4 text-2xl">
                <p>Seach Users</p>
                <button onClick={() => dispatch(setsearchbar(false))} className="text-3xl"><MdCancel /></button>
            </div>

            {/* div2 input box */}
            <div className="flex  justify-between items-center  px-2">
                <input type="text"
                    className="rounded-md w-[80%] p-1"
                    value={query}
                    placeholder="Search by Name or Emal"
                    onChange={(e) => setquery(e.target.value)}
                    // onChangeCapture={searchfxn}
                />
                <button onClick={searchfxn} className="bg-green-700 p-2 rounded-md">Go</button>
            </div>

            {/* div 3 */}
            <div className="mt-1 px-2 h-[calc(100vh-8rem)]  overflow-y-auto">
                {
                    loading ? <div className="w-full flex justify-center h-full  items-center"> <div className="loader"></div> </div> : <>
                        {
                          result.length ==0 ? <div className="w-full h-full flex items-center justify-center text-3xl"><p>Nothing Found</p></div> :  result.map((item, index) => {
                            return <div onClick={()=>newChatfxn(item._id)} className="p-1 py-2 mt-2 border-2 border-b-slate-900 cursor-pointer" key={index}>
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                               
                            </div>
                        }) 
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Searchbar;