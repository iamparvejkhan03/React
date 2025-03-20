import { useContext } from "react";
import { useState } from "react";
import { theUser, UserContext } from "../contexts/UserContext";

function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const {setUser} = useContext(UserContext);
    const {setUser} = theUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        setUser(username);
    }

    return (
        <form className="bg-white bg-opacity-20 p-5 rounded">
            <input className="p-2 rounded outline-none" type="text" name="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />&nbsp;
            <input className="p-2 rounded outline-none" type="text" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />&nbsp;
            <button className="py-2 px-5 rounded bg-slate-400 text-black hover:bg-gray-200" type="submit" onClick={(e) => {handleSubmit(e)}}>Login</button>
        </form>
    );   
}

export default Login;