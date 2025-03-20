import { useState } from "react";
import Card from "./components/Card";
import ThemeBtn from "./components/ThemeBtn";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { useEffect } from "react";

function App(){
    const [themeMode, setThemeMode] = useState("light");
    const html = document.querySelector('html');

    useEffect(() => {
        html.classList.remove('light', 'dark');

        if(themeMode === 'light'){
            html.classList.add('light');
        }else{
            html.classList.add('dark');
        }
    }, [themeMode]);

    return (
        <ThemeContextProvider value={{themeMode, setThemeMode}}>
            <div className="h-screen w-full flex justify-center items-center">
                <div className="w-1/4">
                    <ThemeBtn />
                    <Card />
                </div>
            </div>
        </ThemeContextProvider>
    );
}

export default App;