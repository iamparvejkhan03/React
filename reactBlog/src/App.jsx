import { useEffect, useState } from "react";
import authService from '../appwrite/auth';
import { useDispatch } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import {Outlet} from 'react-router-dom';

function App(){
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService.getCurrentUser().then(userData => {
            if(userData){
                dispatch(login(userData));
            }else{
                dispatch(logout());
            }
        }).catch(error => {throw error}).finally(() => {
            setLoading(false);
        })
    }, [])

    return (
        loading ? "...Loading" : 
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

export default App;