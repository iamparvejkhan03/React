import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Home, Owner, MyBookings, AllRooms, Room, Dashboard, AddRoom, ListRoom} from './pages';
import conf from './conf/conf.js';
import { ClerkProvider } from "@clerk/clerk-react";

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/my-bookings",
                element: <MyBookings />
            },
            {
                path: "/rooms",
                element: <AllRooms />
            },
            {
                path: "/offers",
                element: <AllRooms />
            },
            {
                path: "/room/:id",
                element: <Room />
            },
            {
                path: "/owner",
                element: <Owner />,
                children: [
                    {
                        path: "/owner/dashboard",
                        element: <Dashboard />,
                        index:true
                    },
                    {
                        path: "/owner/add-room",
                        element: <AddRoom /> 
                    },
                    {
                        path: "/owner/list-room",
                        element: <ListRoom /> 
                    }
                ]
            },
        ]
    }
]);

const clerkPublishableKey = conf.clerkPublishableKey;

if(!clerkPublishableKey) throw new Error("Clerk PK missing!");

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ClerkProvider publishableKey={clerkPublishableKey} afterSignOutUrl='/'>
            <RouterProvider router={router} />
        </ClerkProvider>
    </StrictMode>
);
