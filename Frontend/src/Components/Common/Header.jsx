import { IoIosNotifications } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
function Header() {
    return (
        <div className="p-2 py-4 px-5  text-xl bg-gray-500 flex  justify-between ">
            {/* div 1 */}
            <div className="flex justify-center justify-self-center gap-3 ">
                <FaSearch className="self-center" />
                <p > Search bar</p>
            </div>
            {/* div 2 */}
            <div className="font-bold text-2xl"> Chai pe Charcha</div>
            {/* div 3 */}
            <div className="flex ">
                <IoIosNotifications  className="self-center"/>
            </div>

        </div>
    )
}

export default Header;