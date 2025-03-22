import { useEffect, useState } from "react";
import InputBox from "./components/InputBox";
import Todos from "./components/Todos";
import { TodoContextProvider } from "./contexts/TodoContext";

function App(){
    const [todos, setTodos] = useState([]);
    const allTodos = JSON.parse(localStorage.getItem("todos"));
    console.log("got the items from local storage");
    console.log(allTodos); 

    // If you look at this component, you will find out that React first start rendering with App. You see both of the top consoled logs. It does not run the App's useEffect because useEffect is run after the mounting of the component is done, but App's mounting is in progress. App reaches InputBox where it mounts it and as as done with mounting, it runs the useEffect of InputBox, which basically sets an empty array in the local storage as the todos is still an []. After mounting and running InputBox, it comes back to the App and runs the useEffect. It will set the todos state to [] in it. As the state has updated, the entire parent component re-redners, runs the useEffect of InputBox, but App's useEffect won't re-run. When I add an item in the local storage, I update the state and when state changes, App component and InputBox re-renders and useEffect of InputBox runs, sets the item. Now, if you check, the get item local storage is still [] because on re-rendering, it gets first then sets. When we refresh the page, now the get item has an array, it goes into the useEffect, runs the setTodo, changes the state, and re-renders on change, and now, the todos are visible, but new added todos still comes from state, not get item until the page is refreshed.

    useEffect(() => {  
        console.log("enters parent");     
        if(allTodos){
            console.log("inside alltodos");
            setTodos(allTodos);
        }
        console.log("exiting parent");
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('todos', JSON.stringify(todos));
    // }, [todos]);

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