import { useState } from "react";
import InputBox from "./components/InputBox";
import Todos from "./components/Todos";
import { TodoContextProvider } from "./contexts/TodoContext";

function App(){
    const [todos, setTodos] = useState([]);
    return (
        <TodoContextProvider value={{todos, setTodos}}>
            <div className="min-h-screen w-full bg-slate-900 flex justify-center">
                <div className="w-10/12 mt-5 md:w-3/5 lg:w-1/2">
                    <InputBox />
                    <Todos />
                </div>
            </div>
        </TodoContextProvider>
    );
}

export default App;