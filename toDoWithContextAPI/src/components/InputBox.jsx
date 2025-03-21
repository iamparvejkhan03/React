import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import useTodoContext from '../contexts/TodoContext';

function InputBox(){
    const [inputTodo, setInputTodo] = useState("");
    const {todos, setTodos} = useTodoContext();

    const addTodo = (e) => {
        e.preventDefault();
        setTodos(prevTodos => [...prevTodos, {
            id: uuidv4(),
            task: inputTodo,
            isCompleted: false,
            isEditing: false
        }]);
        
        setInputTodo("");
    }

    return (
        <div className="w-full">
            <h1 className="text-white text-2xl text-center font-bold uppercase italic sm:text-3xl md:text-4xl my-5">Manage Your Important Tasks</h1>

            <form className="my-4 bg-slate-800 px-3 py-5 rounded">
                <input className="p-2 rounded-l outline-none w-9/12 md:w-10/12" type="text" name="inputTodo" placeholder="Write Todo..." value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />

                <button onClick={(e) => addTodo(e)} className="py-2 px-4 rounded-r text-white bg-green-600 w-3/12 md:w-2/12" type="submit">Add</button>
            </form>
        </div>
    );
}

export default InputBox;