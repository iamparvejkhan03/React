import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                task: action.payload,
                isCompleted: false
            }
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        completeTodo: (state, action) => {
            state.todos.map(todo => todo.id === action.payload ? todo.isCompleted = !todo.isCompleted : todo.isCompleted);
        },
        updateTodo: (state, action) => {
            state.todos.map(todo => todo.id === action.payload.id ? todo.task = action.payload.task : todo.task);
            console.log("hello");
        }
    }
});

export const {addTodo, removeTodo, completeTodo, updateTodo} = todoSlice.actions;

export const todoReducers = todoSlice.reducer;
