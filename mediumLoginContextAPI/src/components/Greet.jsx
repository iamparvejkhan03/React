import { useContext } from "react";
import { theUser, UserContext } from "../contexts/UserContext";

function Greet(){
    // const {user} = useContext(UserContext);
    const {user} = theUser();

    return (
        <h2 className="text-3xl text-white font-bold">Welcome Back, {user}</h2>
    );
}

export default Greet;