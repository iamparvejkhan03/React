import {useDispatch, useSelector} from 'react-redux';
import { removeTodo, completeTodo, updateTodo } from "../features/todo/todoSlice";
import { useState } from 'react';

function Todos(){
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = (id) => {
        dispatch(removeTodo(id));
    }

    const handleComplete = (id) => {
        dispatch(completeTodo(id));
    }

    const handleUpdate = (task, id) => {
        dispatch(updateTodo({task, id}));
    }

    return (
        <ul>
            {
                todos.map(todo => {
                    return (
                        <li className={`${todo.isCompleted ? "bg-green-600" : "bg-orange-400"} p-3 rounded flex flex-wrap justify-between my-5 items-center`} key={todo.id} >

                            {/* <input className={`w-full p-2 rounded mb-3 ${todo.isEditing ? "bg-white text-black" : "bg-transparent"} outline-none border ${todo.isCompleted ? "border-green-400 text-white line-through" : "border-orange-500 text-black"} sm:w-7/12 sm:p-2 sm:mb-0 lg:w-8/12`} disabled={!todo.isEditing} type="text" name="todoTask" value={todo.task} onChange={(e) => handleUpdate(e.target.value, todo.id)} /> */}

                            <textarea className={`w-full p-2 rounded mb-3 ${isEditing ? "bg-white text-black" : "bg-transparent"} outline-none border ${todo.isCompleted ? "border-green-400 text-white line-through" : "border-orange-500 text-black"} sm:w-7/12 sm:p-2 sm:mb-0 lg:w-8/12`} disabled={!isEditing} type="text" name="todoTask" value={todo.task} onChange={(e) => handleUpdate(e.target.value, todo.id)} rows={1} ></textarea>

                            <div className="w-2/3 flex justify-between sm:w-4/12 lg:w-3/12">
                                <button onClick={() => handleComplete(todo.id)} className="bg-white px-3 py-1 rounded">✔</button>

                                <button onClick={() => setIsEditing(editing => !editing)} className="bg-white px-3 py-1 rounded">{isEditing ? '💾' : '✏️'}</button>

                                <button onClick={() => handleDelete(todo.id)} className="bg-white px-3 py-1 rounded">❌</button>
                            </div>
                        </li>
                    );
                })
            }
        </ul>
    );
}

export default Todos;