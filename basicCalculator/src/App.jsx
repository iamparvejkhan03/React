import { useState } from "react";

function App(){
    let [counter, setCounter] = useState(0);
    let [color, setColor] = useState("text-white");
    let [baseValue, setBaseValue] = useState(""); 
    let [value, setValue] = useState(""); 

    const addValue = () => {
        setCounter(Number(baseValue) + Number(value));
        setColor("text-green-500");
        setBaseValue("");
        setValue("");
    }

    const removeValue = () => {
        setCounter(Number(baseValue) - Number(value));
        setColor("text-red-500"); 
        setBaseValue("");
        setValue("");       
    }

    const multiplyValue = () => {
        setCounter(Number(baseValue) * Number(value));
        setColor("text-orange-500"); 
        setBaseValue("");
        setValue("");       
    }

    const divideValue = () => {
        setCounter(Number(baseValue) / Number(value));
        setColor("text-yellow-500"); 
        setBaseValue("");
        setValue("");       
    }

    return (
        <div className="bg-slate-950 h-screen w-full flex-col flex justify-center items-center">
            <h1 className="text-white text-5xl font-extrabold uppercase mb-6 italic">Basic Calculator</h1>

            <div className="w-5/6 sm:w-3/5 md:w-2/5 lg:w-1/3 bg-slate-800 p-4 sm:p-6 md:p-8 lg:p-10 rounded-md shadow-lg shadow-slate-700">
                <h1 className={`${color} text-3xl md:text-4xl lg:text-5xl font-extrabold uppercase mb-5 text-center`}>Result: <span>{counter}</span></h1>
                <div className="flex flex-col">
                    <form action="" className="flex flex-row flex-wrap w-full">
                        <input value={baseValue} onChange={function(){setBaseValue(()=>event.target.value);}} className="w-full p-2 m-1 rounded" type="number" name="base_value" placeholder="Base Value" />
                        <input value={value} onChange={function(){setValue(()=>event.target.value);}} className="w-full p-2 m-1 rounded" type="number" name="value" placeholder="Value" />
                    </form>

                    <div className="flex flex-row justify-around w-full">
                        <button onClick={addValue} className="font-extrabold text-2xl text-white bg-green-600 w-1/4 m-1 hover:bg-green-700 p-2 rounded-md">+</button>

                        <button onClick={removeValue} className="font-extrabold text-2xl text-white bg-red-600 hover:bg-red-700 p-2 w-1/4 m-1 rounded-md">-</button>

                        <button onClick={multiplyValue} className="font-extrabold text-2xl text-white bg-orange-600 hover:bg-orange-700 p-2 w-1/4 m-1 rounded-md">*</button>

                        <button onClick={divideValue} className="text-white bg-yellow-600 hover:bg-yellow-700 p-2 w-1/4 m-1 rounded-md font-extrabold text-2xl">/</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;