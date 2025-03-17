import { useState } from "react";

function App(){
    let [color, setColor] = useState('bg-black');

    return (
        <div className={`${color} w-full h-screen flex justify-center items-end`}>
            <div className="w-4/5 bg-white p-3 rounded-md my-5 flex justify-around">
                <button onClick={() => setColor('bg-green-700')} className="bg-green-700 text-white py-2 px-6 rounded">Green</button>

                <button onClick={() => setColor('bg-blue-700')} className="bg-blue-700 text-white py-2 px-6 rounded">Blue</button>

                <button onClick={() => setColor('bg-red-700')} className="bg-red-700 text-white py-2 px-6 rounded">Red</button>

                <button onClick={() => setColor('bg-yellow-700')} className="bg-yellow-700 text-white py-2 px-6 rounded">Yellow</button>

                <button onClick={() => setColor('bg-pink-700')} className="bg-pink-700 text-white py-2 px-6 rounded">Pink</button>

                <button onClick={() => setColor('bg-orange-700')} className="bg-orange-700 text-white py-2 px-6 rounded">Orange</button>

                <button onClick={() => setColor('bg-purple-700')} className="bg-purple-700 text-white py-2 px-6 rounded">Purple</button>

                <button onClick={() => setColor('bg-slate-700')} className="bg-slate-700 text-white py-2 px-6 rounded">Slate</button>
            </div>
        </div>
    );
}

export default App;