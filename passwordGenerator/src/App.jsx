import { useCallback, useEffect, useRef, useState } from "react";

function App(){
    let [range, setRange] = useState(16);
    let [password, setPassword] = useState("");
    let [number, setNumber] = useState(false);
    let [characters, setCharacters] = useState(false);
    let passwordRef = useRef(null);
    
    let copyPassword = () => {
        passwordRef.current?.select();
        window.navigator.clipboard.writeText( password );
    }

    //useCallback hook is not helpful in my case because the dependencies change everytime to generate a new password and when they change, react recreates the function with a new function reference in the memory. Refreshing the page automatically resets everything, so no memoization or function reference works in that case as refresh resets everything.

    let randomPasswordGenerator = useCallback(() => {
        let pass = "";
        let aplhabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(number === true){
            aplhabets += "1234567890";
        }

        if(characters === true){
            aplhabets += "~!@#$%^&*()[]{}";
        }
        
        for(let i=0; i<range; i++){
            let randomNum = Math.floor(Math.random()*aplhabets.length);
            pass += aplhabets[randomNum];
        }

        // return pass;
        setPassword(pass); 
    }, [range, number, characters]);

    useEffect(() => {
        // setPassword(randomPasswordGenerator());
        randomPasswordGenerator();
    }, [range, number, characters]);

    return (
        <div className="w-full h-screen bg-slate-950 flex flex-col justify-start items-center">

            <h1 className="text-white font-extrabold text-4xl italic uppercase my-5">Random Password Generator</h1>

            <div className="bg-gray-800 px-6 py-8 flex flex-col md:w-2/5">
                <div>
                    <input type="text" name="password" className="w-10/12 p-2 rounded-l outline-none" readOnly value={password} ref={passwordRef} />
                    <button onClick={copyPassword} className="text-white bg-gray-600 w-2/12 p-2 rounded-r border border-gray-600 hover:bg-gray-700">Copy</button>
                </div><br />

                <div className="flex w-full justify-around">
                    <div className="flex w-full md:w-6/12">
                        <input type="range" name="range" id="range" min={8} max={100} value={range} onChange={(e) => setRange(e.target.value)} className="cursor-pointer" />
                        <label className="text-white mx-2 align-middle" htmlFor="range">Length ({range})</label>
                    </div>

                    <div className="flex w-full md:w-3/12">
                        <input type="checkbox" name="numbers" id="numbers" checked={number} onChange={() => {setNumber(prevNum => !prevNum);}} className="cursor-pointer" />
                        <label className="text-white mx-2 align-middle" htmlFor="numbers">Numbers</label>
                    </div>

                    <div className="flex w-full md:w-3/12">
                        <input type="checkbox" name="characters" id="characters" onChange={() => setCharacters(prevChar => !prevChar)} className="cursor-pointer" />
                        <label className="text-white mx-2 align-middle" htmlFor="characters">Characters</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;