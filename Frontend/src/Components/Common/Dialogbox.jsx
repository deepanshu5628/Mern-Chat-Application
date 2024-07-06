import { useState } from "react"
import { Searchuser } from "../../Services/Operations/User";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";
import { creategroupchat } from "../../Services/Operations/Chats";
import { setdialogbox } from "../../Redux/Slices/authSlice";

function Dialogbox() {
    let dispatch = useDispatch();
    let { token } = useSelector((state) => state.auth);
    let [groupname, setgroupname] = useState("");
    let [groupmember, setgroupmember] = useState("");
    let [selecteduser, setselecteduser] = useState([]);
    let [searchresult, setsearchresult] = useState([]);
    let [loading, setloading] = useState(false);

    // fxn1 
    async function searchfxn() {
        if (groupmember === "") {
            let emptyarr = []
            setsearchresult(emptyarr);
            return
        } else {


            setloading(true);
            let res = await Searchuser({ query: groupmember }, token)
            // console.log(res);
            if (res.success) {
                setsearchresult(res.data)
            }
            if (!res.success) {
                console.log(res.message);
            }
            setloading(false);
        }
    }

    // fxn2 
    async function selectfxn(item) {
        // check if the item already exist ?
        let result = selecteduser.every((da, index) => da._id !== item._id)
        if (!result) {
            return toast.error("Ustaz tez na bni ");
        }
        if (result) {
            selecteduser.push(item);
            setselecteduser(selecteduser);
            setgroupmember("");
        }
    }
    // fxn3
    function removeselecteduser(item) {
        let newarr = selecteduser.filter((da) => da._id != item._id);
        setselecteduser(newarr);
    }
    //    fxn4
    async function createGrpchat() {
        if (selecteduser.length <= 1) {
            toast.error("select atleast two user");
            return
        }
        let userids = [];
        selecteduser.map((item) => {
            return userids.push(item._id);
        })
        let data = {
            chatName: groupname,
            isGroupChat: true,
            users: userids
        }
        let res = await creategroupchat(data, token);
        console.log(res);
        if (res.success) {
            toast.success("Group Created ");
            dispatch(setdialogbox(false));
        }
        if (!res.success) {
            toast.error(res.message);
        }
    }

    return (
        <div className="absolute top-[25%] left-[30%] bg-gray-600 min-h-[40%] w-[40%] rounded-sm ">
            <div className="w-full  p-2 flex flex-col gap-3 items-center">
                {/* heading */}
                <p className="text-3xl ">Create Group Chat </p>
                {/* first input */}
                <input type="text"
                    className="w-[90%] rounded-sm p-1"
                    value={groupname}
                    onChange={(e) => setgroupname(e.target.value)}
                    placeholder="Chat Name"
                />
                {/* second input  */}
                <input type="text"
                    className="w-[90%] rounded-sm p-1"
                    value={groupmember}
                    onChange={(e) => setgroupmember(e.target.value)}
                    placeholder="Add User eg:John piyush etc"
                    onChangeCapture={searchfxn}
                />
                {/* div to see the selected user */}
                {
                    selecteduser !== null && <div className="flex flex-wrap w-[90%] overflow-auto gap-2 max-h-[4rem] ">
                        {
                            selecteduser.map((item, index) => {
                                return <div key={index} className="flex items-center gap-1 bg-purple-500 px-1">
                                    <p className=" text-white p-1 text-sm cursor-default"> {item.name}</p>
                                    <ImCross onClick={() => removeselecteduser(item)} className="text-sm cursor-pointer" />
                                </div>
                            })
                        }
                    </div>
                }
                {/* div to generate search results */}
                {
                    loading ? <div className="loader"></div> : <> {
                        groupmember != "" && searchresult.length > 0 ? <div
                            className="w-[50%] max-h-[10rem]   overflow-auto">
                            {
                                searchresult.map((item, index) => {
                                    return <div key={index} className=" cursor-pointer px-2  text-center my-1">
                                        <p onClick={() => selectfxn(item)} className="font-semibold  bg-pink-400 my-1 p-1">{item.name}</p>
                                    </div>
                                })
                            }
                        </div> : null
                    }</>
                }
                <div className="w-[90%] my-2 flex  justify-end">
                    <button onClick={createGrpchat} className="text-white bg-blue-500 rounded-sm p-2">Create Chat </button>
                </div>
            </div>
        </div>
    )
}

export default Dialogbox