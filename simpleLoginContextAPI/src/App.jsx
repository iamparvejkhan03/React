import { useContext, useState } from "react";
import Login from "./components/Login";
import User from "./components/User";
import UserContextProvider from "./contexts/UserContextProvider";
import UserContext from "./contexts/UserContext";

function App(){
    // const {user, setUser} = useContext(UserContext);

    return (
        <UserContextProvider>
            <div className="h-screen w-full bg-slate-950 flex flex-col gap-5 justify-center items-center">
                <Login />
                <User />
            </div>
        </UserContextProvider>
    );
}

export default App;