import { createContext, useCallback, useContext } from "react";

const TodoContext = createContext({
    todos: [],
    setTodos: () => {}
});

const TodoContextProvider = TodoContext.Provider;

export default function useTodoContext(){
    return useContext(TodoContext);
}

export {TodoContext, TodoContextProvider}