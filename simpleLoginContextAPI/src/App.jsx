import Login from "./components/Login";
import User from "./components/User";
import UserContextProvider from "./contexts/UserContextProvider";

function App(){
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