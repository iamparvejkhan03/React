import { useDispatch } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import authService from '../../../appwrite/auth';

function LogoutBtn(){
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout().then(() => dispatch(logout()));
    }

    return (
        <button onClick={logoutHandler} className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Log Out</button>
    );
}

export default LogoutBtn;