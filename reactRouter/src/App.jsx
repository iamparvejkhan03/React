import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { Outlet } from "react-router-dom";

function App(){
    return (
        <>
        <Header />
        <Outlet />
        <Footer />
        </>
    );
}

export default App;