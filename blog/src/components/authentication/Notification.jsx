import { hideNotification } from "../../../features/notification/notificationSlice";
import { useDispatch } from "react-redux";

function Notification({
    value="", 
    className="w-full bg-red-200 text-red-700 border rounded shadow border-red-300 p-5"
    }){
        const dispatch = useDispatch();
    return (
        <div className={`${className} flex flex-col`}>
            <i className="fa-solid fa-x text-sm self-end mb-2 cursor-pointer" onClick={() => dispatch(hideNotification())}></i>
            <p className="text-center text-sm">{value}</p>
        </div>
    );
}

export default Notification;