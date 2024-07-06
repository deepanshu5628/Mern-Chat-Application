import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
function ChatInfo() {
    let dispatch = useDispatch();
    let { selectedchat } = useSelector((state) => state.auth);
    return (
        <div className='w-[69%] rounded-lg p-3 bg-pink-900'>
            {
                selectedchat == null &&
                <div className="h-full flex justify-center items-center">
                    <p className="text-4xl">CLick on a user to start chating</p>
                </div>
            }
            {
                selectedchat != null && <div className="flex flex-col w-full h-full">
                    <div className="  w-full flex justify-between p-2 px-4 ">
                        <p className="text-3xl font-semibold ">{selectedchat}</p>
                        <FaEye className="text-3xl" />
                    </div>
                    <div className="w-full h-full bg-gray-500 rounded-sm">
                    </div>
                </div>
            }
        </div>
    )
}

export default ChatInfo;