import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        }, 
        updateAuth: (state, action) => {
            state.userData = action.payload;
        }
    }
});

const authReducer = authSlice.reducer;

export const {login, logout, updateAuth} = authSlice.actions;
export default authReducer;