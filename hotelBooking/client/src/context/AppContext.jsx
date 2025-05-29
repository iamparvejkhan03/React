import { createContext, useEffect } from "react";
import { useContext } from "react";
import conf from "../conf/conf";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { toast } from 'react-hot-toast';

const AppContext = createContext();
axios.defaults.baseURL = `${conf.baseUrl}`;
const currency = conf.currency || "$";

const AppContextProvider = ({children}) => {
    const {user} = useUser();
    const { getToken } = useAuth();
    const [isOwner, setIsOwner] = useState(false);
    const [showHotelRegForm, setShowHotelRegForm] = useState(false);
    const [seachedCities, setSeachedCities] = useState([]);
    const [rooms, setRooms] = useState([]); 

    const fetchUser = async () => {
        try {
            const {data} = await axios.get(`/api/user`, {
                headers: {Authorization: `Bearer ${await getToken()}`}
            });
            
            if(data.success){
                setIsOwner(data.role === 'hotelOwner');
                setSeachedCities(data.recentSearchedCities);
            }else{
                setTimeout(() => {
                    fetchUser();
                }, 5000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getRoomData = async () => {
        const { data } = await axios.get('/api/rooms/all');

        if(data.success){
            setRooms(data.allRooms);
        }else{
            toast.error(data.message);
        }
    }

    useEffect(() => {
        getRoomData();
    }, [])

    useEffect(() => {
        if(user){
            fetchUser();
        }
    }, [user])

    return <AppContext.Provider value={{currency, axios, user, getToken, isOwner, setIsOwner, showHotelRegForm, setShowHotelRegForm, seachedCities, setSeachedCities, rooms, setRooms}}>
                {
                    children
                }
            </AppContext.Provider>
}

const useAppContext = () => {
    return useContext(AppContext);
};

export {AppContext, AppContextProvider, useAppContext};