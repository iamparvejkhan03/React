import { useState } from "react";
import Login from "./components/Login";
import User from "./components/User";
import { UserContextProvider } from "./contexts/UserContext";

function App(){
    const [user, setUser] = useState("Guest");

    return (
        <UserContextProvider value={{user, setUser}}>
            <div className="h-screen w-full bg-slate-950 flex flex-col gap-5 justify-center items-center">
                <Login />
                <User />
            </div>
        </UserContextProvider>
    );
}

export default App;