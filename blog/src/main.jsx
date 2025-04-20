import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Home, AllPosts, AddPost, Login, Register, Post, EditPost, Profile} from "./pages/index.js";
import store from "../store/store.js";
import { Provider } from "react-redux";
import {Protected} from "./components/";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Protected authentication={false}>
                            <Home />
                        </Protected>
            },
            {
                path: "/all-posts",
                element: <Protected authentication={false}>
                            <AllPosts />
                        </Protected>
            },
            {
                path: "/add-post",
                element: (
                    <Protected authentication>
                        <AddPost />
                    </Protected>
                )
            },
            {
                path: "/post/:slug",
                element: (
                    <Protected authentication={false}>
                        <Post />
                    </Protected>
                )
            },
            {
                path: "/edit-post/:slug",
                element: (
                    <Protected authentication>
                        <EditPost />
                    </Protected>
                )
            },
            {
                path: "/profile",
                element: (
                    <Protected authentication>
                        <Profile />
                    </Protected>
                )
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            }
        ],
    },
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </StrictMode>
);