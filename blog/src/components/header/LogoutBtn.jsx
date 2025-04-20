import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../features/auth/authSlice";
import appwrite_auth_service from "../../../appwrite/auth";

function LogoutBtn({children, type, className="", ...props}){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        try{
            appwrite_auth_service.logout().then(result => {
                if(result){
                    dispatch(logout());
                    navigate('/');
                }
            })
        }catch(error){
            throw error;
        }
    }

    return (
        <button className={className} onClick={logoutHandler} {...props}>{children}</button>
    );
}

export default LogoutBtn;