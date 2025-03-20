import { useContext } from "react";
import { createContext } from "react";

const ThemeContext = createContext({
    themeMode: "",
    setThemeMode: () => {}
});

export const ThemeContextProvider = ThemeContext.Provider;

export default function useTheme(){
    return useContext(ThemeContext);
}