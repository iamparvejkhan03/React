import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({children, authentication}){
    const authStatus = useSelector(state => state.auth.status); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(authentication && authStatus === false){
            navigate('/login');
        }else{
            setLoading(false);
        }
    }, [authStatus, authentication, navigate])

    return (
        loading ? "...loading" : <>{children}</>
    );
}

export default Protected;