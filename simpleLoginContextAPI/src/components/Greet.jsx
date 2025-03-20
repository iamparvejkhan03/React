import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function Greet(){
    const {user} = useContext(UserContext);
    return (
        <h2 className="text-3xl text-white font-bold">Welcome Back, {user}</h2>
    );
}

export default Greet;