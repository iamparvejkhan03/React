import useTodoContext from "../contexts/TodoContext";

function Todos(){
    const {todos, setTodos} = useTodoContext();

    const handleComplete = (id) => {
        setTodos(todos.map(todo => {
            if(todo.id == id){
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        }));
    }

    const handleEditing = (id) => {
        setTodos(todos.map(todo => {
            if(todo.id == id){
                todo.isEditing = !todo.isEditing;
            }
            return todo;
        }));
    }

    const handleUpdate = (value, id) => {
        setTodos(todos.map(todo => {
            if(todo.id == id){
                todo.task = value;
            }
            return todo;
        }));
    }

    const handleDelete = (id) => {
        setTodos(todos.filter(todo => todo.id != id));
    }

    return (
        <ul>
            {
                todos.map(todo => {
                    return (
                        <li className={`${todo.isCompleted ? "bg-green-600" : "bg-orange-400"} p-3 rounded flex flex-wrap justify-between my-5 items-center`} key={todo.id} >

                            {/* <input className={`w-full p-2 rounded mb-3 ${todo.isEditing ? "bg-white text-black" : "bg-transparent"} outline-none border ${todo.isCompleted ? "border-green-400 text-white line-through" : "border-orange-500 text-black"} sm:w-7/12 sm:p-2 sm:mb-0 lg:w-8/12`} disabled={!todo.isEditing} type="text" name="todoTask" value={todo.task} onChange={(e) => handleUpdate(e.target.value, todo.id)} /> */}

                            <textarea className={`w-full p-2 rounded mb-3 ${todo.isEditing ? "bg-white text-black" : "bg-transparent"} outline-none border ${todo.isCompleted ? "border-green-400 text-white line-through" : "border-orange-500 text-black"} sm:w-7/12 sm:p-2 sm:mb-0 lg:w-8/12`} disabled={!todo.isEditing} type="text" name="todoTask" value={todo.task} onChange={(e) => handleUpdate(e.target.value, todo.id)} rows={1} ></textarea>

                            <div className="w-2/3 flex justify-between sm:w-4/12 lg:w-3/12">
                                <button onClick={() => handleComplete(todo.id)} className="bg-white px-3 py-1 rounded">✔</button>

                                <button onClick={() => handleEditing(todo.id)} className="bg-white px-3 py-1 rounded">{todo.isEditing ? '💾' : '✏️'}</button>

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