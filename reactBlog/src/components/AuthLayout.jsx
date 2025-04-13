import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Protected({children, authentication=true}){
    const navigate = useNavigate();
    const authStatus = useSelector(state => state.auth.status);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        //true && false
        if(authentication && authStatus !== authentication){
            navigate("/login");
            //false && false
        }else if(!authentication && authStatus !== authentication){
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, authentication, navigate])

    return (
        loader ? <p>Loading...</p> : <>{children}</>
    );
}

export default Protected;